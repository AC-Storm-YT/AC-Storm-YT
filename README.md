# Hi, I'm AC Storm! 👋

**Developer** | **IT Support**

I've been programming since **2014**.

My background combines software development with hands-on knowledge of computer hardware, operating systems, networking, servers, virtualization, databases, deployment, and technical support.

## 👨‍💻 About Me

* 💻 Primarily focused on **C# and .NET development**
* 🌐 Experience building websites with **HTML, CSS, and JavaScript**
* 🛠️ Interested in desktop applications, utilities, automation, game modding, and system tools
* 🖥️ Strong understanding of computer hardware, Windows, software, and troubleshooting
* 🤖 I use AI-assisted development tools, primarily Codex through ChatGPT and Claude Code, for learning, prototyping, debugging, and accelerating complex implementations
* 📚 Currently improving my software architecture, code quality, and deeper systems-programming knowledge

## 📖 My Story

I started coding in 2014 with Visual Basic and transitioned to C# in 2017. Over time, I expanded into web development using HTML, CSS, and JavaScript while also developing a strong interest in computers, hardware, networking, operating systems, and technical troubleshooting.

AI-assisted development is an important part of my workflow. I primarily use Codex through ChatGPT and Claude Code to explore unfamiliar concepts, prototype solutions, troubleshoot problems, and accelerate complex implementations. I define the intended behavior, make the technical decisions, test the results, and work to understand and maintain the code used in my projects.

My goal is to combine development and IT knowledge to create practical applications, automation tools, network utilities, and software that solves real problems.

## 🚧 Notable projects

* **[Alphy](https://github.com/AC-Storm-YT/Alphy-Public) & [Alphy Swapper](https://github.com/AC-Storm-YT/Alphy-Swapper)** - A Rocket League cosmetic mod manager designed for safer local file swapping, custom imports, backups, mod sharing, and plugins. Alphy Swapper is the official swapping plugin for Alphy. It lets you generate Rocket League cosmetic swaps from supported UPK assets directly inside Alphy.
* **[Rocket Swap](https://rocketswap.dev/)** — The successor to Alphy. Rocket Swap is a Windows mod manager and local visual swapper for Rocket League. It imports and organizes cosmetic mods, generates visual item swaps, applies selected changes before launch, and restores clean game files after Rocket League closes.
* **[Windows Security Patcher](https://github.com/AC-Storm-YT/windowssecuritypatcher)** - A Windows 11 utility for repairing inaccessible or greyed-out Memory Integrity and Kernel-mode Hardware-enforced Stack Protection settings.
* **[NextDNS Linker](https://github.com/AC-Storm-YT/ndnslinker)** - NextDNS Linker is a small Windows utility for networks without a static public IP address. It validates a NextDNS linked-IP URL and creates a Windows Task Scheduler entry that refreshes the link whenever Windows reports a network-profile connection event.
---
## 🤝 Open-source contributions
* **[Leonida](https://github.com/ItsNotRexed/Leonida)** - A static recompilation of the Xbox Series version of Grand Theft Auto VI to run natively on Windows, built by each player from their own copy (no game files in the repo; not affiliated with Rockstar Games or Take-Two). It includes an RDNA2 → SPIR-V shader translator and an Xbox D3D12 → Vulkan layer.
  * Merged: [#201](https://github.com/ItsNotRexed/Leonida/pull/201) fixed undefined shifts in the `v_perm_b32` / `v_alignbit_b32` translation and added value tests; [#378](https://github.com/ItsNotRexed/Leonida/pull/378) added value tests for `v_min3` / `v_max3`; [#573](https://github.com/ItsNotRexed/Leonida/pull/573) documented AMD's tiled-resource behaviour; [#786](https://github.com/ItsNotRexed/Leonida/pull/786) documented buffer bounds checking measured on RDNA2; [#868](https://github.com/ItsNotRexed/Leonida/pull/868) made the D3D12 layer's tiled resources follow AMD's mip layout; [#2728](https://github.com/ItsNotRexed/Leonida/pull/2728) made the layer report AMD's packed tile count for reserved textures; [#3210](https://github.com/ItsNotRexed/Leonida/pull/3210) fixed the Windows runtime build, which a new test's CMake rule had broken whenever llvm-mc was configured.
  * In review: [#4422](https://github.com/ItsNotRexed/Leonida/pull/4422) makes the hardware test tool write 16-bit `op_sel` instructions the way RDNA3/RDNA4 assemblers accept, so they run there instead of being skipped; [#4519](https://github.com/ItsNotRexed/Leonida/pull/4519) gets the LDS fuzzer running natively on RDNA4.
  * Found **D3D-65**: the D3D12 layer's tiled-resource mip layout matched NVIDIA only. Measured AMD's behaviour on RDNA2 and RDNA4; the layer now follows it, since the console is AMD.
  * Measured buffer bounds checking (V# `OOB_SELECT`) natively on RDNA2: it follows Mesa's GFX11 rules, not the GFX10 ones the translator was going to use.
  * Found that PC RDNA2 GPUs lack `v_mad_f32` / `v_mac_f32` / `v_mad_legacy_f32` (only RDNA1 and the console's GFX10.1 have them), which corrected the hardware a project item asked for.
  * Measured on RDNA4 (RX 9070 XT): a wave64 `ds_bpermute_b32` reads across all 64 lanes, where RDNA2 keeps each 32-lane half separate, and `ds_cmpstore` takes the store value before the compare value.
  * Ran all 65,536 `ds_swizzle_b32` offsets natively on RDNA2, which showed a translator change was wrong for the top 16,384 ([#4177](https://github.com/ItsNotRexed/Leonida/pull/4177), fixed the same day); settled an operand-order dispute in [#4160](https://github.com/ItsNotRexed/Leonida/pull/4160) from the raw instruction bytes.
  * GPU-tested other contributors' translator and runtime PRs on AMD hardware (RDNA2 and RDNA4, native wave64), often as the only AMD or RDNA4 run.
---

## 🛠️ Skills, Tools & Technologies

**💻 Languages & Application Development**  
![C#](https://img.shields.io/badge/C%23-512BD4?style=flat&logo=csharp&logoColor=white)
![.NET](https://img.shields.io/badge/.NET-512BD4?style=flat&logo=dotnet&logoColor=white)
![Visual Basic](https://img.shields.io/badge/Visual_Basic-512BD4?style=flat&logo=dotnet&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white)
![Lua](https://img.shields.io/badge/Lua-2C2D72?style=flat&logo=lua&logoColor=white)
![SQL](https://img.shields.io/badge/SQL-4479A1?style=flat)

<br>

**🌐 Web & Frontend**  
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

<br>

**☁️ Cloud, Backend & Storage**  
![Cloudflare Workers](https://img.shields.io/badge/Cloudflare_Workers-F38020?style=flat&logo=cloudflareworkers&logoColor=white)
![Cloudflare KV](https://img.shields.io/badge/Cloudflare_KV-F38020?style=flat&logo=cloudflare&logoColor=white)
![Cloudflare R2](https://img.shields.io/badge/Cloudflare_R2-F38020?style=flat&logo=cloudflare&logoColor=white)
![Cloudflare D1](https://img.shields.io/badge/Cloudflare_D1-F38020?style=flat&logo=cloudflare&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=flat&logo=supabase&logoColor=white)

<br>

**🔍 Reverse Engineering & Analysis**  
![Ghidra](https://img.shields.io/badge/Ghidra-B71C1C?style=flat&logo=github&logoColor=white)
![ILSpy](https://img.shields.io/badge/ILSpy-512BD4?style=flat&logo=dotnet&logoColor=white)
![dnSpy](https://img.shields.io/badge/dnSpy-6C3483?style=flat&logo=dotnet&logoColor=white)

<br>

**🧰 Tools & Workflow**  
![Visual Studio](https://img.shields.io/badge/Visual_Studio-5C2D91?style=flat&logo=visualstudio&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/VS_Code-007ACC?style=flat&logo=visualstudiocode&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=flat&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)
![Windows](https://img.shields.io/badge/Windows-0078D4?style=flat&logo=windows11&logoColor=white)

<br>

**🤖 AI-Assisted Development**  
![Codex](https://img.shields.io/badge/Codex-412991?style=flat&logo=openai&logoColor=white)
![ChatGPT](https://img.shields.io/badge/ChatGPT-412991?style=flat&logo=openai&logoColor=white)
![Claude](https://img.shields.io/badge/Claude-D97757?style=flat&logo=claude&logoColor=white)
![Gemini](https://img.shields.io/badge/Gemini-8E75B2?style=flat&logo=googlegemini&logoColor=white)

<br>

**🖥️ IT & Infrastructure**  
![Networking](https://img.shields.io/badge/Networking-00599C?style=flat&logo=cisco&logoColor=white)
![Windows Server](https://img.shields.io/badge/Windows_Server-0078D4?style=flat&logo=windows&logoColor=white)
![Virtualization](https://img.shields.io/badge/Virtualization-607D8B?style=flat&logo=virtualbox&logoColor=white)
![Hardware Support](https://img.shields.io/badge/Hardware_Support-555555?style=flat&logo=pcgamingwiki&logoColor=white)
![Technical Support](https://img.shields.io/badge/Technical_Support-009688?style=flat&logo=helpdesk&logoColor=white)

---

### 🖥️ IT Support Experience

* Computer assembly, hardware installation, and peripheral support
* Windows installation, configuration, recovery, and optimization
* Local network installation and configuration
* Server and network maintenance
* Virtualization environments
* Database management fundamentals
* Software installation and deployment
* System commands and scripting
* Technical support and structured troubleshooting
* Mobile-device and collaboration-tool support

<div align="center">

</div>

## 📫 Connect With Me

<p align="center">
  <a href="https://discord.com/users/329051281891131393">
    <img src="https://img.shields.io/badge/Discord-5865F2?style=flat&logo=discord&logoColor=white" alt="Discord" />
  </a>
</p>
