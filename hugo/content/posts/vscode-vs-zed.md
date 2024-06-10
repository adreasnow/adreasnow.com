---
title: "VSCode vs Zed (vs GoLand) - Comparing Power Consumption"
date: 2024-06-10T16:24:22+10:00
draft: false
toc: false
images:
tags:
  - benchmarking
---

## Preamble

I loved Sublime Text. I really did. I used it for everyhting from remote python dev on supercomputers, to writing academic papers in LaTeX (see [my old guide on getting it set up](https://adreasnow.com/academic/Cheat%20Sheets%20and%20Play/Cheat%20Sheets/LaTeXSetup/#theme-for-non-latex-files) for proof). When VSCode came out with its "Remote Explorer" functionality I was torn. It was just too useful for the remote work I was doing, but it meant switching to a heavy electron app. 

I missed the responsiveness of Sublime Text, but I found a new peace in the added functionality of the VSCode extention ecosystem.

### Post Academia

I [left academia about 9 months ago](https://adreasnow.com/academic/), and have happily been working at [Xero](https://www.xero.com/au/), a publicly traded accounting software company in a DevOps focused role. I don't get to play too much to with code these days, and if I wanted to, it'd unfortunately be .NET (I'm a full blown gopher for sure, so this hurts me in my soul).

The takeaway is that instead of using SSH connections to access remote servers, these days I'm focusing on editing all the falvours of yaml (k8s, GHA, dependabot, cloudformation), terraform, json, TeamCity flavoured kotlin, and all the other boring stuff that one edits locally and runs remotely. 

Thankfully, most of these tools have their own language servers, or rely on common syntax, so my need for fancy features has largely disappeared. There are a couple of exceptions of course, but thankfully Xero is nice enough to pay for Intellij Idea for validating TeamCity Kotlin, and Rider for handling all the .NET nonsense.

### Moving away from VSCode

VSCode has become the default and with it my shiny M2 macbook pro has been reduced to a 3-4 hour battery life. So naturally I turned back to my old love Sublime Text for something a bit native. I'm sorry to say it, but it's feeling old... The plugin system feels outdated, the tree of config files is a mess, and just getting go to work the way I wanted took four different plugins to set up.

I'm not sure if you've heard yet, but there's a hot new native code editor in town called [Zed](https://zed.dev). It boasts better  performance than Sublime text, a more minimalistic layout, an inbuilt extenstions system, community collaboration tools, (optionsl) AI integration, native shared sessions, extremely parallel processing, etc.

It's what Sublime Text needs to be in 2024.

## Energy Consumption

I'm sure you've all fallen into the trap before, that you make some changes to your system but you just can't tell how those changes fit in the grand scheme of things since there's so much goping on. I was having this issue with deciding if Zed was really that much better on my battery life, so I decided to do a few little tests.

### The tests

My testing protocol was simple:

- Start an energy profiler
- Use VSCode in a "Real world" coding setup for 30 minutes
  - This was a minimal set of extensions, with just what was needed to get Go working as desired
  - A full setup with all your plugins and tool extensions (Docker, DB connectors, etc.) would likely be even worse...
- Collect the data
- Repeat with Zed

Power profiling is a really non-trivial concept since you can't directly correlate CPU/GPU/memory usage to power due to complex schedulers running on complex architectures, however I decided to make my life a little easier by using apple's `powermetrics` tool ([manpage](https://www.unix.com/man-page/osx/1/powermetrics/)). 

The tool was simple enough to use. just call the tool as root, tell it to poll every 15 seconds, and spit out the average power usage every time it polls:

```bash
sudo powermetrics -i 15000 --poweravg 1
```

Then I could grep out the program's process from there and collate the data later (The "`]`" is important for getting the process from the right section of the output, the "Average cumulatively decayed power score"):

```bash
sudo powermetrics -i 15000 --poweravg 1 | grep ']Zed'
```

### Getting the Process tree

While this would work for Zed (ignoring its child `gopls` instance, VSCode is an ugly mess, so instead I needed to pull out the processes using `pstree` (use activity monitor to get the parent pid, call it with `pstree <pid>`):

```bash
-+= 55060 adrea /Applications/Visual Studio Code.app/Contents/MacOS/Electron
 |--- 55061 adrea /Applications/Visual Studio Code.app/Contents/Frameworks/Code Helper (GPU).app/Contents/MacOS/Code Helper (GPU) --type=gpu-process --user-data-dir=/Users/adrea/Library/Application Support/Code
 |--- 55062 adrea /Applications/Visual Studio Code.app/Contents/Frameworks/Code Helper.app/Contents/MacOS/Code Helper --type=utility --utility-sub-type=network.mojom.NetworkService --lang=en-GB --service-sandbox
 |--- 55100 adrea /Applications/Visual Studio Code.app/Contents/Frameworks/Code Helper.app/Contents/MacOS/Code Helper --type=utility --utility-sub-type=node.mojom.NodeService --lang=en-GB --service-sandbox-type=
 |-+- 55152 adrea /Applications/Visual Studio Code.app/Contents/Frameworks/Code Helper.app/Contents/MacOS/Code Helper --type=utility --utility-sub-type=node.mojom.NodeService --lang=en-GB --service-sandbox-type=
 | \--= 57446 adrea /bin/zsh -il
 |--- 57431 adrea /Applications/Visual Studio Code.app/Contents/Frameworks/Code Helper (Renderer).app/Contents/MacOS/Code Helper (Renderer) --type=renderer --user-data-dir=/Users/adrea/Library/Application Suppor
 |-+- 57433 adrea /Applications/Visual Studio Code.app/Contents/Frameworks/Code Helper (Plugin).app/Contents/MacOS/Code Helper (Plugin) --type=utility --utility-sub-type=node.mojom.NodeService --lang=en-GB --ser
 | |--- 57441 adrea /opt/homebrew/bin/gopls -mode=stdio
 | \--- 59872 adrea /Applications/Visual Studio Code.app/Contents/Frameworks/Code Helper (Plugin).app/Contents/MacOS/Code Helper (Plugin) /Applications/Visual Studio Code.app/Contents/Resources/app/extensions/ma
 \--- 57434 adrea /Applications/Visual Studio Code.app/Contents/Frameworks/Code Helper.app/Contents/MacOS/Code Helper --type=utility --utility-sub-type=node.mojom.NodeService --lang=en-GB --service-sandbox-type=
```

### Running the tests

Now I had to condense those down into a grep line for the processes (wrapped in square brackets) and we're off the the market:

```bash
sudo powermetrics -i 15000 -a 1 | grep '\[55060\]\|\[55061\]\|\[55062\]\|\[55100\]\|\[55152\]\|\[57446\]\|\[57431\]\|\[57433\]\|\[57441\]\|\[57434\]|\[59872\]\|15 sec'
```

The "``15 sec`" ensures that it prints out the headers of the table each poll, so that I can tell them apart:

```bash
                                      	   15 sec    	   1 min     	   5 min     	   15 min    	   1 hr
[57431]Code Helper (Renderer)          	   395.179	<calculating>
[55100]Code Helper                     	   290.446	<calculating>
[55060]Electron                        	     99.35	<calculating>
[57441]gopls                           	    57.742	<calculating>
[55061]Code Helper (GPU)               	   55.3173	<calculating>
[57433]Code Helper (Plugin)            	   34.8403	<calculating>
...
```

Perfect! now I just worked on my backlog of [Advent of Code](https://adventofcode.com) challenges and wait for the data to come in. 30 minutes later, I would do the same for zed.

```bash
                                      	   15 sec    	   1 min     	   5 min     	   15 min    	   1 hr
[38277]Zed                             	   381.262	<calculating>
[57872]gopls                           	   33.3986	<calculating>
...
```



### Collating the results

Once I had the data, I averaged the results for each proc over each of the 15 second averages, and these were the results:

#### VSCode

| Proc                   | Power    |
| ---------------------- | -------- |
| Code Helper (Renderer) | 777.308  |
| Code Helper            | 58.0937  |
| gopls                  | 60.7302  |
| Electron               | 152.095  |
| Code Helper (Plugin)   | 37.4791  |
| Code Helper (GPU)      | 131.038  |
|                        |          |
| Total                  | 1216.744 |

#### Zed

| Proc  | Power    |
| ----- | -------- |
| Zed   | 413.203  |
| gopls | 57.6019  |
|       |          |
| Total | 470.8049 |



#### Comparison

1216.744 ÷ 470.8049 = 2.58x

VSCode is 2.58x more power hungry than Zed. Even with a minimal setup. I'm honeslty not sure why so much of this comes from the renderer...



#### Edit: GoLand (added for a friend)

#### Zed

| Proc   | Power   |
| ------ | ------- |
| goland | 2907.65 |
|        |         |
| Total  | 2907.65 |

2907.65 ÷ 470.8049 = 6.18x :sweat_smile:

## My Takeaway

Zed is still lacking a couple of features that I really miss from VSCode, such as:

- Source control pane
  - That said, I do REALLY like the integrated inline git blame, and it does have git gutters
- Inbuilt build configurations (cmd + B to build)
  - [Tasks](https://zed.dev/docs/tasks) are nice, but they lack the cleanliness of build configs, and I've found that some of the variables like `$ZED_DIRNAME` and `$ZED_FILENAME` don't update straight away when you switch files
- Debugging support
- [WakaTime](https://wakatime.com) Integration!
  - I know, its not on the Zed people to do this, but still would be REALLY nice!

That said, I'm going to use it as much as I can and support the Zed team however I can, since we're LONG overdue for a Sublime Text replacement, and I'm not definitley giving that title to [JetBrains Fleet](https://www.jetbrains.com/fleet/)! (This feels even more valid a statement after testing GoLand)
