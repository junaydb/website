---
title: "Rendering Huge Point Clouds in Real-time"
description: >
  I created software for rendering point clouds containing hundreds of millions 
  of points in real-time. To achieve this, I implemented a sophisticated rendering
  solution from scratch in C++ and OpenGL. The software uses the octree data 
  structure to implement a Level of Detail (LOD) system. In this post, I discuss
  what the point of this software is, and provide a high-level overview of how
  the software is implemented.
date: 2026-05-20
order: 1
published: true
meta:
  - type: tags
    items:
      - C++
      - OpenGL
      - SDL
      - Octrees
      - Performance
  - type: links
    items:
      - text: GitHub
        href: https://github.com/junaydb/octree-pointcloud-renderer
---

## What is a point cloud?

Point clouds are 3D models that consist of only points. Compared to traditional
polygon mesh models, point clouds offer a higher level of accuracy when representing
physical things in the real world. Because of this, point clouds are heavily used in
areas such as surveying to represent things like construction sites, where
accuracy of the captured model is critical. Here's a screenshot of one from the
software:

![Cliff face point cloud (screenshot from the software)](https://ik.imagekit.io/xqhypdkfa/capstone/cliff-face-ss.png)
Phantom Bluff Cliff Face, Lake Oswego (12.8M points).  
[By ’TLT Photography - Aerial Mapping’ on Sketchfab.](https://sketchfab.com/3d-models/phantom-bluff-cliff-face-lake-oswego-6d75b738e1bb4861a5a68956b4cf80ce)

Point clouds are commonly captured using LiDAR scanners, and often raw scans
can contain hundreds of millions to even billions of points depending on how
large the scan is.

## The problem

Rendering point clouds with hundreds of millions of points requires a lot of data
to be processed in real-time (real-time meaning ~30 FPS). If taking the naive
approach of simply rendering every point to the screen, most consumer-grade
hardware is not capable of handling this in real-time.

## The solution

If you've played video games, you've probably heard the term 'LOD' before.
It stands for 'Level of Detail'. Almost every 3D game uses a LOD system to
reduce workload on the GPU by rendering things in the distance using lower
resolution models:

![lod-example](https://ik.imagekit.io/xqhypdkfa/capstone/lod-example-2.png)
Different LODs of a mesh. Image taken from [this paper](https://books.google.co.uk/books?id=M-gl4aoxQfIC)

The solution this software implements uses the same principle. The concept is
very simple:

1. Different LODs are generated for the input point cloud
2. Closer parts of the point cloud are rendered using higher-resolution LODs, while distant parts use lower-resolution LODs.

## Octree-based LOD system

So what is an octree? An octree is a spatially aware data structure that
recursively partitions a cube into octants. In other words, it's a data
structure that splits a cube into 8 smaller cubes, and then those subsequent
cubes can also be split into 8 smaller cubes, and so on. 'Spatially aware'
simply means that the data structure is based in coordinate space, so we can
retrieve the position of each octant:

![octree-diagram](https://ik.imagekit.io/xqhypdkfa/capstone/octree-diagram.png)
Visual representation of an octree, [taken from here](https://devforum.roblox.com/t/dynamic-octree-system/2177042)

So how does the software use this to create a LOD system?  
The idea is simple: at each level of the tree, store a subsample of the point cloud.
Since each level of the tree is up to 8x more dense than the previous level,
each subsequent level from the root node contains a more detailed subsample of
the point cloud. All nodes in the octree when joined together form the orignal
point cloud, so no duplicate points are created.

To make that explanation clearer, here's an image that shows how each level of
the tree gets progressively more detailed:

![octree-LODs](https://ik.imagekit.io/xqhypdkfa/capstone/octree-LODs.png)

The point cloud on the very left would be stored in the root node (level 0),
the second would be level 2 of the octree, the third level 3, and the fourth level 4.

And that's how the LOD system essentially works.
LODs are stored at each level of the octree and increase in detail the deeper down the tree you go.

If you'd like to learn more about how the algorithm for building the octree is
implemented in code, you can read the 'inserting points' section of
[this paper](https://www.cg.tuwien.ac.at/research/publications/2011/scheiblauer-2011-cag/scheiblauer-2011-cag-paper.pdf).
This paper is what I based the octree implementation in this software on.

The code below is the implementation of that explanation. It also includes the
optimisation of not creating a new node before a certain number of points is accumalated
in a node, which prevents nodes that are mostly empty from being created, in
result improving the time it takes to traverse the octree:

```cpp
void OctreeNode::insert(const glm::vec3* position, const glm::u8vec3* colour) {
  // get the 1D projected grid cell index of the point's position in 3D space
  int gridCellHash =
      (std::floor(position->x / cellSize)) +
      (std::floor(position->y / cellSize)) * resolution +
      (std::floor(position->z / cellSize)) * resolution * resolution;

  // if the point falls into an unoccupied grid cell, place it there,
  // else if below min threshold, store in overflow,
  // else insert into the appropriate child node
  if (grid.find(gridCellHash) == grid.end()) {
    grid[gridCellHash] = {*position, *colour};
  } else if (grid.size() + overflowPositions.size() < minPointsPerNode) {
    overflowPositions.push_back(*position);
    overflowColours.push_back(*colour);
  } else {
    unsigned int childNodeIdx = getChildNodeIndex(position);
    if (!isChildActive(childNodeIdx)) {
      createChildNode(childNodeIdx);
    }
    children[childNodeIdx]->insert(position, colour);
  }

  // if threshold surpassed, flush overflow into children
  if (grid.size() + overflowPositions.size() > minPointsPerNode) {
    for (size_t i = 0; i < overflowPositions.size(); i++) {
      unsigned int childNodeIdx = getChildNodeIndex(&overflowPositions[i]);
      if (!isChildActive(childNodeIdx)) {
        createChildNode(childNodeIdx);
      }
      children[childNodeIdx]->insert(&overflowPositions[i], &overflowColours[i]);
    }
    overflowPositions.clear();
    overflowColours.clear();
  }
}
```

## Rendering the point cloud using the LOD system

Now with this structure, we can render nodes that are closer to the camera in
higher detail by rendering deeper levels of the octree, whilst rendering nodes
that are further away in lower detail by rendering lower levels of the octree.
To know how far away a node is from the camera, the software gets the distance
between the camera and the centre of the node.

So how does this part actually work? Again, the idea is quite simple:  
First, a user-defined points-per-frame budget is set. Next, all nodes are collected
into an array and then sorted based on their distance to the camera. Then, the
nodes are drawn in that sorted order until the point budget is hit.
The result of this is automatically rendering nodes closer to the camera in higher
detail, whilst rendering distance nodes in lower detail. This is because we're
drawing the nodes in ascending order of distance to the camera, so naturally,
most of the points-per-frame budget will be allocated to the nearer nodes and by
the time we reach the further nodes, we'll most likely hit the budget, causing
the distant nodes to only be able to render in lower levels of the tree.

## Rendering the octree with OpenGL

A big part of this project was learning OpenGL and linear algebra
in the context of graphics programming in order to implement the 3D renderer from
scratch in C++.

I'm not going to explain how the 3D rendering is implemented here because there's
a ton of resources online that will explain how that works far better than I can,
and there's nothing unique about aspect to this project.

I will however briefly explain how the data for rendering is organised and sent
to the GPU as that part is specific to this project (if you don't have experience
with OpenGL, this will be gibberish).

Each node is associated with three buffers:

- A vertex buffer for position data
- A vertex buffer for colour data
- An index buffer for the node's bounding box vertices

<br />
Each node also has a VAO for storing the vertex configuration for each node.
Once the octree is built, node's are traversed in breadth-first order until a
user-defined point buffer budget is hit*. Then when it comes time for drawing, a
node's VAO is bound and `glDrawArrays()` is called, rendering the node's points
to the screen.

The implementation probably has a lot of room for optimisation, however, it works
well enough for this project and I'm too much of an OpenGL novice to know better.

\*The point buffer budget enables the software to only buffer a point cloud partially.
This is useful in the scenario where a user's machine doesn't have enough memory to buffer the
entire point cloud. It's a very naive solution as it's not spatially aware,
so it would just result in the points beyond the point budget being removed which
visually could look like part of the point cloud being missing.

## Measuring performance with SDL

To measure the performance of the software, I measure the total computation time
of each frame by starting a timer at the start of the rendering loop (or game loop)
and ending it at at the end of the rendering loop.

To do this, we use `SDL_GetPerformanceCounter()` which returns the current value
of the system's high resolution counter. This value is essentially the number
of ticks that have elapsed since the system started. We also use
`SDL_GetPerformanceFrequency()` which returns a number representing the number
of ticks in one second.

Using this, we can quite easily measure how long each frame takes in milliseconds
and FPS:

```cpp
void Timer::start() {
  startTime = SDL_GetPerformanceCounter();
}

void Timer::end() {
  endTime = SDL_GetPerformanceCounter();
  elapsedMS =
      static_cast<float>(endTime - startTime) /
      static_cast<float>(SDL_GetPerformanceFrequency()) * 1000.f;
  FPS = static_cast<int>(1000.f / elapsedMS);
}
```

`glFinish()` is also called before ending the timer each frame. `glFinish()`
forces the CPU to wait for all queued OpenGL work to finish, without this,
it's not guaranteed that all the GPU rendering is truly complete within the current
loop iteration.

## Results

I tested this software on two systems: an M1 Macbook Pro and a PC with an
RTX 3080. For a point cloud containing ~330 million points, the LOD system improves
performance from ~3 FPS to around ~60 FPS, with the points-per-frame budget set
to 20 million when using the LOD system. A huge improvement!

In addition, when comparing the original point cloud with 330M points being
rendered side-by-side with the point cloud being rendered with 20M points using
the LOD system, there wasn't a noticeable difference in visual fidelity. In
other words, the LOD system provides a huge performance boost whilst also
allowing you to view the point cloud very true to the original.

## Using the software

You can find instructions for building and using this software in the  
[GitHub](https://github.com/junaydb/octree-pointcloud-renderer) repository.
It's quite archaic to use as I didn't have time to implement a GUI.

## Screenshots from the software

![notre-dame-facade-ss](https://ik.imagekit.io/xqhypdkfa/capstone/notre-dame-facade-ss.png)
Notre Dame Facade (14.5M points).  
[By ’CHEI - UC San Diego’ on Sketchfab](https://sketchfab.com/3d-models/notre-dame-paris-facade-hi-res-point-cloud-50deeb164f324d1c8607bafa67f948b9)

![elmstead-ultra-dense-ss](https://ik.imagekit.io/xqhypdkfa/capstone/elmstead-ultra-dense-ss.png)
Elmsted Ultra Dense (330M points). By the University of Essex.

![octree-vis-ss](https://ik.imagekit.io/xqhypdkfa/capstone/octree-vis-ss.png)
The octree structure visualised in the software.

## Conclusion

I learned a lot through building this project. It was especially
interesting to see how applicable abstract data structures like octrees could be
for real-world use cases.

I kept the explanations in this post high-level and skimmed over a lot of details
as my intention was to just convey the core idea of how the LOD system works.
I left out things explaining things like shaders and handling user input as
they were less interesting and quite trivial/boilerplatey. But feel free to explore the
[codebase](https://github.com/junaydb/octree-pointcloud-renderer) to see the
complete implementation.

Thanks for reading!
