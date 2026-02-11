[![ORGAN-II: Poiesis](https://img.shields.io/badge/ORGAN--II-Poiesis-6a1b9a?style=flat-square)](https://github.com/organvm-ii-poiesis)

# example-choreographic-interface

[![CI](https://github.com/organvm-ii-poiesis/example-choreographic-interface/actions/workflows/ci.yml/badge.svg)](https://github.com/organvm-ii-poiesis/example-choreographic-interface/actions/workflows/ci.yml)
[![Coverage](https://img.shields.io/badge/coverage-pending-lightgrey)](https://github.com/organvm-ii-poiesis/example-choreographic-interface)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/organvm-ii-poiesis/example-choreographic-interface/blob/main/LICENSE)
[![Organ II](https://img.shields.io/badge/Organ-II%20Poiesis-EC4899)](https://github.com/organvm-ii-poiesis)
[![Status](https://img.shields.io/badge/status-active-brightgreen)](https://github.com/organvm-ii-poiesis/example-choreographic-interface)
[![Markdown](https://img.shields.io/badge/lang-Markdown-informational)](https://github.com/organvm-ii-poiesis/example-choreographic-interface)


**Movement and dance as computational interface — choreographic notation meets generative systems.**

> *The body is the oldest computer. Every gesture is an instruction, every phrase a subroutine, every dance a program that writes itself through space and time.*

---

## Table of Contents

- [Artistic Purpose](#artistic-purpose)
- [Conceptual Approach](#conceptual-approach)
- [Theoretical Foundations](#theoretical-foundations)
- [Planned Architecture](#planned-architecture)
- [Comparative Landscape](#comparative-landscape)
- [Integration with ORGAN-II Systems](#integration-with-organ-ii-systems)
- [Theory Implemented from ORGAN-I](#theory-implemented-from-organ-i)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

---

## Artistic Purpose

The choreographic interface is a research prototype exploring what happens when we treat the moving human body not as a subject to be captured but as an **input device** for generative computational systems. Where motion capture asks "how do we record movement?", this project asks a different question entirely: **how does movement speak to machines, and what do machines create when they listen?**

Dance and choreography have always been technologies of the body — structured systems for organizing movement through space and time. Laban Movement Analysis formalized effort, shape, space, and body into a rigorous analytical vocabulary. Benesh and Labanotation created written scores that could preserve and transmit choreographic knowledge across generations. Contact improvisation developed real-time protocols for bodies negotiating shared weight and momentum. Each of these represents a different kind of interface between intention, embodiment, and notation.

This project sits at the intersection of those traditions and contemporary computer vision. Rather than building yet another motion-capture pipeline that reduces the body to a skeleton of tracked joints, `example-choreographic-interface` aims to build a **movement vocabulary layer** — a translation system that maps choreographic concepts (effort qualities, spatial pathways, rhythmic phrasing, relational dynamics) into parameter streams that can drive generative art, music, lighting, and architectural systems.

The artistic ambition is to create performances where the dancer is not merely triggering pre-programmed responses but genuinely **programming in real time** through the quality and structure of their movement. A sustained, bound, direct movement should produce fundamentally different generative output than a sudden, free, indirect one — not because we mapped those qualities to arbitrary parameters, but because the system understands something about the **ontology of movement** itself.

This is an ORGAN-II example repository — a concrete, self-contained demonstration of how the broader poiesis infrastructure (core-engine, performance-sdk) can be extended into specific artistic domains. It serves as both a working prototype and a pedagogical resource for artists and technologists interested in embodied computation.

---

## Conceptual Approach

### The Body as Programming Language

Most human-computer interfaces flatten bodily expression into discrete triggers: a button press, a gesture recognized or not recognized, a pose matched against a template. The choreographic interface takes a fundamentally different approach, treating the body as a **continuous, multi-dimensional programming language** with its own syntax, grammar, and semantics.

In this model:

- **Vocabulary** consists of movement qualities (effort factors), spatial patterns (kinespheric pathways), and temporal structures (rhythmic phrases). These are not discrete gestures to be "recognized" but continuous spectra to be read and interpreted.
- **Syntax** emerges from the sequencing and layering of movement qualities — how one effort quality transitions to another, how spatial pathways combine with temporal phrasing, how the body organizes itself through successive moments.
- **Semantics** is the mapping from movement syntax to generative parameters. This is where artistic decisions live: what does a spiral through the kinesphere mean for the sound design? What does a shift from sustained to sudden effort do to the visual field?
- **Pragmatics** encompasses the performative context — the relationship between dancer and system, the audience's perception, the feedback loops that emerge when the dancer can perceive the system's responses and adjust accordingly.

### Movement Vocabulary Mapping

The core intellectual challenge is building a **movement vocabulary** that is rich enough to be artistically expressive but structured enough to be computationally tractable. We draw on several traditions:

**Laban Movement Analysis (LMA)** provides the primary analytical framework. The four effort factors — Weight (light/strong), Time (sustained/sudden), Space (indirect/direct), and Flow (free/bound) — offer a continuous, multi-dimensional description of movement quality that maps naturally to parameter spaces. LMA's concept of effort phrasing (how effort qualities sequence and combine over time) provides temporal structure.

**Forsythe's Choreographic Objects** contribute the idea that choreographic thinking can be externalized into systems, environments, and objects that generate movement possibilities. The choreographic interface extends this concept: the computational system itself becomes a choreographic object, one that responds to and shapes the dancer's improvisational choices.

**Topological approaches to movement** (drawing from Steve Paxton's material for the spine work and Lisa Nelson's tuning scores) inform how we think about movement as continuous deformation rather than discrete position. The system should read the topology of movement — its continuities, bifurcations, and phase transitions — not just its geometry.

### Gesture-to-Parameter Translation

The translation layer between raw pose data and meaningful movement parameters operates at three levels:

1. **Kinematic extraction** — deriving velocity, acceleration, angular momentum, center of mass trajectory, and joint-relationship metrics from raw pose estimation data.
2. **Quality analysis** — mapping kinematic data to movement quality descriptors (effort factors, shape qualities, spatial tension patterns) using both heuristic models and learned representations.
3. **Parameter generation** — translating movement quality streams into output parameter streams that can drive downstream generative systems via the ORGAN-II performance-sdk parameter bus.

Each level introduces interpretive decisions. The kinematic layer must decide what to track and at what temporal resolution. The quality layer must model the inherently subjective and culturally situated nature of movement perception. The parameter layer must make artistic choices about how movement meaning becomes generative instruction.

---

## Theoretical Foundations

### Embodied Cognition and Enactivism

The choreographic interface is grounded in **enactivist** theories of cognition — the view that cognition is not computation happening inside a brain but a dynamic process enacted through the ongoing coupling of organism and environment. In this framework, the dancer-system coupling is not a matter of the dancer "controlling" the system or the system "reading" the dancer, but of a **shared cognitive process** that emerges from their interaction.

This has practical implications for system design. The feedback loop between dancer and system must be tight enough that the dancer can perceive the system's responses within their movement phrasing. Latency budgets are not just technical constraints but phenomenological requirements — the system must respond within the temporal grain of embodied perception (roughly 80–150ms for proprioceptive integration).

### Notation as Interface

Every choreographic notation system is also an interface — a structured way of mediating between movement intention and movement execution. Labanotation, Benesh Movement Notation, Forsythe's improvisation technologies, and even contact improvisation's implicit "score" of weight-sharing principles all function as interfaces between different modes of knowing and doing.

The choreographic interface makes this latent function explicit. By treating movement analysis as a real-time notation process — one that writes the score as the dance unfolds — we create a system where notation is no longer retrospective documentation but **prospective instruction**. The score-being-written drives the generative system, creating a temporal loop where past movement shapes future environment shapes future movement.

### Recursive Aesthetics

Movement generates parameters. Parameters shape the generative environment. The environment influences the dancer's perception and proprioception. Perception shapes movement. This recursive loop is not a bug to be controlled but the **fundamental aesthetic engine** of the system. The artistic quality of a choreographic interface performance depends on how richly and responsively this loop operates.

---

## Planned Architecture

```
┌─────────────────────────────────────────────────────────┐
│                  CAPTURE LAYER                          │
│  ┌──────────┐  ┌──────────┐  ┌───────────────────┐     │
│  │ MediaPipe │  │ OpenPose │  │ Depth Camera SDK  │     │
│  └────┬─────┘  └────┬─────┘  └────────┬──────────┘     │
│       └──────────────┼─────────────────┘                │
│                      ▼                                  │
│            Pose Normalization                           │
│            (skeleton → canonical form)                  │
└──────────────────────┬──────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────┐
│                KINEMATIC LAYER                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │ Joint velocities, accelerations, angular momenta │   │
│  │ Center-of-mass trajectory and stability metrics  │   │
│  │ Joint-relationship graphs (distances, angles)    │   │
│  │ Temporal windowing (phrase-level aggregation)    │   │
│  └──────────────────────┬───────────────────────────┘   │
└─────────────────────────┬───────────────────────────────┘
                          ▼
┌─────────────────────────────────────────────────────────┐
│              QUALITY ANALYSIS LAYER                     │
│  ┌────────────┐  ┌────────────┐  ┌────────────────┐    │
│  │ Effort     │  │ Shape      │  │ Spatial        │    │
│  │ Analysis   │  │ Analysis   │  │ Analysis       │    │
│  │ (LMA)      │  │ (Growing/  │  │ (Kinesphere    │    │
│  │            │  │  Shrinking/│  │  pathways,     │    │
│  │ Weight     │  │  Advancing/│  │  levels,       │    │
│  │ Time       │  │  Retreating│  │  directions)   │    │
│  │ Space      │  │  etc.)     │  │                │    │
│  │ Flow       │  │            │  │                │    │
│  └─────┬──────┘  └─────┬──────┘  └───────┬────────┘    │
│        └────────────────┼─────────────────┘             │
│                         ▼                               │
│               Movement Phrase Parser                    │
│               (temporal segmentation + phrasing)        │
└─────────────────────────┬───────────────────────────────┘
                          ▼
┌─────────────────────────────────────────────────────────┐
│             PARAMETER GENERATION LAYER                  │
│  ┌──────────────────────────────────────────────────┐   │
│  │ Quality streams → normalized parameter vectors   │   │
│  │ Phrase boundaries → structural events            │   │
│  │ Mapping presets (artist-configurable)             │   │
│  └──────────────────────┬───────────────────────────┘   │
│                         ▼                               │
│            performance-sdk Parameter Bus                │
│            (OSC / WebSocket / MIDI)                     │
└─────────────────────────────────────────────────────────┘
```

### Capture Layer

The system is designed to be **capture-agnostic** — it should work with any source of skeletal pose data. Initial implementation targets:

- **MediaPipe Pose** — browser-based, zero-setup, suitable for workshops and quick prototyping. Provides 33 landmarks at ~30fps from a single RGB camera.
- **OpenPose** — higher-fidelity multi-person tracking, suitable for ensemble work. Requires GPU but provides richer body model (including hands and face).
- **Depth cameras** (Intel RealSense, Azure Kinect) — direct 3D skeletal tracking without monocular depth estimation artifacts.

A **pose normalization** stage converts vendor-specific skeleton formats into a canonical representation (joint hierarchy, coordinate system, confidence metrics) so that downstream layers are capture-backend-agnostic.

### Kinematic Layer

Raw pose sequences are processed into kinematic descriptors: per-joint velocity and acceleration vectors, angular velocities at each joint, center-of-mass trajectory and stability metrics (base of support, balance indicators), and joint-relationship metrics (inter-joint distances and their rates of change).

Temporal windowing applies overlapping windows at multiple scales (frame-level ~33ms, gesture-level ~500ms, phrase-level ~3–8s) to capture movement dynamics at different temporal grains.

### Quality Analysis Layer

This is the heart of the system — the layer that transforms kinematic data into movement quality descriptors. Three parallel analysis modules operate simultaneously:

- **Effort analysis** estimates the four LMA effort factors as continuous values. Weight is derived from acceleration magnitude and grounding indicators. Time is derived from velocity profiles and acceleration onset rates. Space is derived from path complexity and directional clarity. Flow is derived from joint-chain coordination and movement continuity.
- **Shape analysis** tracks the body's changing spatial volume and directional tendencies — whether the mover is growing or shrinking, advancing or retreating, spreading or enclosing.
- **Spatial analysis** maps the mover's kinespheric usage — which zones of the surrounding space are being activated, at what levels, along what pathways.

A **movement phrase parser** segments the continuous quality streams into phrase-level units, identifying beginnings, middles, endings, and transitions — the punctuation of movement.

### Parameter Generation Layer

Quality streams and phrase events are mapped to output parameter vectors through configurable mapping presets. Artists can define how effort qualities, shape tendencies, and spatial patterns translate into the parameters their specific generative system expects. The output connects to the ORGAN-II **performance-sdk parameter bus** for distribution to downstream renderers, sound engines, lighting controllers, and other systems.

---

## Comparative Landscape

### Choreographic Notation Systems

| System | Focus | Relationship to This Project |
|--------|-------|------------------------------|
| **Labanotation** | Comprehensive written notation for movement | Primary analytical vocabulary (effort, shape, space) adapted for real-time computational analysis |
| **Benesh Movement Notation** | Ballet-focused visual notation | Influences spatial-plane decomposition in the analysis layer |
| **Forsythe Improvisation Technologies** | Geometric and topological movement concepts | Conceptual framework for treating computation as choreographic object |
| **MotionBank** | Digital archive of choreographic practice | Precedent for computational annotation of choreographic knowledge |
| **Life Forms / DanceForms** | 3D animation software for choreography | Inverse relationship — those tools animate virtual bodies; this project reads real ones |

### Motion Capture and Analysis Tools

| Tool | What It Does | How This Project Differs |
|------|-------------|--------------------------|
| **OpenPose** | Multi-person 2D pose estimation | Used as input backend; this project adds quality analysis and parameter mapping layers above raw pose data |
| **MediaPipe** | Lightweight browser-based pose tracking | Used as input backend; same distinction as OpenPose |
| **Wekinator** | Machine learning for gesture recognition | Wekinator maps gestures to discrete classes; this project maps continuous movement qualities to continuous parameters |
| **EyesWeb** | Multimodal analysis platform | Similar goals but focused on pre-defined movement features; this project emphasizes LMA-grounded quality analysis |
| **Isadora** | Interactive media environment | Isadora is a downstream consumer of this project's parameter output; they are complementary |
| **TouchDesigner** | Visual programming for real-time media | Same relationship as Isadora — a potential downstream renderer rather than a movement analysis system |

### Key Differentiators

Most existing systems operate at either the **kinematic level** (pose estimation, joint tracking, gesture recognition) or the **artistic application level** (triggering media, controlling visuals). The choreographic interface occupies the **missing middle** — the movement quality analysis layer that translates between raw kinematics and meaningful artistic parameters. This is the layer where embodied knowledge about movement lives, and it is the layer that most existing systems either skip or handle with ad-hoc heuristics.

---

## Integration with ORGAN-II Systems

### Connection to core-engine

The ORGAN-II [core-engine](https://github.com/organvm-ii-poiesis) provides the foundational generative infrastructure — parameter routing, renderer management, timeline control, and state synchronization. The choreographic interface connects to core-engine as a **parameter source**: movement quality streams feed into the core-engine's parameter bus, where they can be routed to any registered renderer or effect.

The core-engine's parameter normalization ensures that choreographic parameters play well with other input sources (sensor data, algorithmic generators, audience interaction systems). A performance might combine choreographic input with ambient sensor data, using core-engine's mixing and routing capabilities to blend multiple parameter streams.

### Connection to performance-sdk

The [performance-sdk](https://github.com/organvm-ii-poiesis) provides the transport layer between the choreographic interface and downstream renderers. Movement parameters are serialized and transmitted via OSC, WebSocket, or MIDI — whichever protocol the downstream system expects.

The performance-sdk also handles the **feedback path**: when generative systems produce output that affects the performance environment (projections, sound, lighting), the dancer perceives those changes proprioceptively and visually, closing the recursive loop. The SDK's low-latency transport is critical for maintaining the tight coupling that enactivist performance requires.

### Data Flow

```
Dancer → [Choreographic Interface] → Parameter Bus (core-engine) → Renderers
   ↑                                                                    │
   └──────────── Perceptual Feedback (light, sound, projection) ────────┘
```

---

## Theory Implemented from ORGAN-I

This repository directly implements theoretical work from [ORGAN-I (Theoria)](https://github.com/organvm-i-theoria), specifically from the [recursive-engine](https://github.com/organvm-i-theoria/recursive-engine--generative-entity):

### The Body as Recursive System

The recursive-engine's central thesis — that creative systems gain depth through self-referential loops — manifests here as the **dancer-system feedback loop**. The body is not a one-way input device but a participant in a recursive process: movement generates parameters, parameters shape the environment, the environment shapes perception, perception shapes movement. Each cycle through the loop adds a layer of accumulated context, producing emergent complexity that neither dancer nor system could generate alone.

### Recursive Depth as Aesthetic Metric

The recursive-engine proposes that the "depth" of a recursive system — how many layers of self-reference it sustains before collapsing into repetition or chaos — is a measurable aesthetic quantity. In the choreographic interface, recursive depth corresponds to how many cycles of the dancer-system loop produce genuinely novel output versus how quickly the system falls into predictable patterns. This metric can guide both system design and artistic practice.

### Ontological Layering

ORGAN-I's ontological framework distinguishes between different levels of description (physical, informational, experiential, aesthetic). The choreographic interface's layered architecture — capture, kinematic, quality, parameter — mirrors this ontological structure, with each layer operating at a different level of abstraction and interpretive commitment.

---

## Roadmap

### Phase 1 — Foundation (Current)

- [x] Repository structure and documentation (this README)
- [ ] Pose normalization module (MediaPipe backend)
- [ ] Basic kinematic extraction (velocity, acceleration, center-of-mass)
- [ ] Proof-of-concept effort analysis (Weight and Time factors)
- [ ] OSC output to TouchDesigner or Max/MSP

### Phase 2 — Quality Analysis

- [ ] Complete LMA effort analysis (all four factors)
- [ ] Shape analysis module (growing/shrinking, advancing/retreating)
- [ ] Spatial analysis module (kinespheric zones, levels, pathways)
- [ ] Movement phrase parser (temporal segmentation)
- [ ] Calibration tools for per-dancer normalization

### Phase 3 — Integration

- [ ] Performance-sdk parameter bus integration
- [ ] Core-engine parameter source registration
- [ ] Multi-person tracking and relational analysis
- [ ] OpenPose and depth-camera backend support
- [ ] Artist-configurable mapping presets

### Phase 4 — Performance

- [ ] Real-time visualization of quality analysis (for dancer feedback)
- [ ] Performance recording and playback (quality-level, not just kinematic)
- [ ] Workshop-mode interface (simplified for educational contexts)
- [ ] Documentation of at least three performance case studies

---

## Contributing

This project is part of the ORGAN-II creative infrastructure and welcomes contributions from artists, technologists, movement researchers, and anyone interested in embodied computation.

Areas where contributions are especially valuable:

- **Movement analysis expertise** — if you have training in LMA, BMC, contact improvisation, or other somatic practices, your knowledge of movement quality is essential for validating and refining the quality analysis layer.
- **Pose estimation and computer vision** — improving the capture layer's robustness, adding new backends, optimizing for real-time performance.
- **Generative art and performance** — building downstream renderers and performance systems that demonstrate the choreographic interface's expressive range.
- **Documentation and pedagogy** — creating tutorials, workshop materials, and case studies that make embodied computation accessible.

Please open an issue to discuss substantial changes before submitting a pull request. All contributions should maintain the project's commitment to treating movement as a rich, multi-dimensional phenomenon rather than reducing it to discrete gesture triggers.

---

## License

[MIT](LICENSE)

---

## Author

**[@4444j99](https://github.com/4444j99)** — builder of recursive systems, believer in the body as the oldest and most sophisticated computer we have access to.

Part of [ORGAN-II: Poiesis](https://github.com/organvm-ii-poiesis) — the art-making organ of the [organvm](https://github.com/meta-organvm) system.
