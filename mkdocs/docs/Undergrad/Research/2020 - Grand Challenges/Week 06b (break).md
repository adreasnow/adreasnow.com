# Mid Sem Break

## Sunday, 13. September 2020

### 9:48 AM

The PModel guess seems to make the SCF take really unrealistically large steps downwards, and the DIIS tuning doesn't seem to have helped much either. I'm currently testing with the PAtom guess to see if it makes any difference at all.

### 10:21 AM

I've found what seems to be a functioning system!

```
! Opt B97-3c cc-pvtz Def2/j CPCM
%scf
   Guess PAtom
end
```

I'll let it keep going for a bit, but I might also throw in some level shifting to see if it helps things along

### 1:17 PM

I've since found (from reading through the ORCA manual) that there's actually a cc-pVnZ/JK aux basis set available, so I'm currently testing with that. It's strange though that the [ORCA Input Library](https://sites.google.com/site/orcainputlibrary/basis-sets) says to use Def2/J aux for cc-pVnZ basis sets...

I did also have a shot at using M06-L but it wasn't converging, and M06-2X just was too slow to even bother with.

### 3:03 PM

While these jobs don't still don't seem to be converging nicely, they are reaching much lower energies ($\sim4\:Eh$ lower) than their Def2/J counterparts were.

## Monday, 14. September 2020

### 10:22 AM

I noticed that some time in the chaos of getting everything to work, I made a mistake and pasted the S4il geometry into the S4aq input, which is why the S4aq SCF convergence hasn't been working. I've since corrected this and it's back on track again.

I've also decided to go back to my (seemingly) minimal working setup from yesterday of changing nothing but the guess, though I have thrown in a small amount of level shifting as well.

Just to be doubly sure, I've also taken the most optimised S4il geometry and re-optimised with PM7 (MOPAC) to be sure. I've since noticed that this is actually the method employed by Xu, Izgorodina and Coote[^1] as the solvent layer for their IL ONIOM model. Other papers have also used xTB, though I've not been able to get this to work for my system, due to solvation parameterisation issues. I think in their case, they used PBC and thus didn't bother with a dielectric, as the whole cell was explicitly solvated.

[^1]:Xu, L.; Izgorodina, E. I.; Coote, M. L. Ordered Solvents and Ionic Liquids Can Be Harnessed for Electrostatic Catalysis. *J. Am. Chem. Soc.* **2020**, *142* (29), 12826–12833. https://doi.org/10.1021/jacs.0c05643.

### 10:34 AM

This has definitely fixed the S4aq system (to nobody's surprise), though it does seem that fro the S4il system, the PM7 geometry is MUCH higher energy, despite being not overly different to the more optimised one, though it is also optimising rather smoothly. I'm using the PAtom guess, cc-pvtz/JK fitting set and level shifting for that job as well, so hopefully it will optimise to a better minima.



Fingers crossed though that the PAtom job goes smoothly, as I am very much over SCF issues. I dealt with them a LOT over summer and they truly are becoming the bane of my existence as a comp chemist. Once I am truly qualified (maybe post PhD) though I'll be able to call myself the SCF master!

#### Changes with cc-pvtz/JK

<span style="color: grey; text-align: center; font-style: italic;" class="center">Changes marked with a ==highlight==</span>

|           |                          S1                          |                          S2                          |                          S3                          |                         S4                          |
| --------- | :--------------------------------------------------: | :--------------------------------------------------: | :--------------------------------------------------: | :-------------------------------------------------: |
| **Gas**   | ==Opt/Freq <span style="color: green;">Done</span>== | Opt/Freq <span style="color: orange;">Running</span> | Opt/Freq <span style="color: orange;">Running</span> |                         N/A                         |
| **Water** | Opt/Freq <span style="color: orange;">Running</span> |  Opt/Freq <span style="color: blue;">Queued</span>   | Opt/Freq <span style="color: orange;">Running</span> |  Opt/Freq <span style="color: blue;">Queued</span>  |
| **IL**    |  Low Opt <span style="color: blue;">Waiting</span>   |  Low Opt <span style="color: blue;">Waiting</span>   |  Low Opt <span style="color: blue;">Waiting</span>   | Low Opt <span style="color: orange;">Running</span> |

### 11:12 AM

The minimal working example didn't seem to be converging, so I've just killed it for now and will hope for the best with my PM7 run

## Tuesday, 15. September 2020

### 9:58 AM

<span style="color: grey; text-align: center; font-style: italic;" class="center">Changes marked with a ==highlight==</span>

|           |                          S1                          |                            S2                            |                          S3                          |                            S4                            |
| --------- | :--------------------------------------------------: | :------------------------------------------------------: | :--------------------------------------------------: | :------------------------------------------------------: |
| **Gas**   |   Opt/Freq <span style="color: green;">Done</span>   |   ==Opt/Freq <span style="color: green;">Done</span>==   | ==Opt/Freq <span style="color: green;">Done</span>== |                           N/A                            |
| **Water** | Opt/Freq <span style="color: orange;">Running</span> | ==Opt/Freq <span style="color: orange;">Running</span>== | Opt/Freq <span style="color: orange;">Running</span> | ==Opt/Freq <span style="color: orange;">Running</span>== |
| **IL**    |  Low Opt <span style="color: blue;">Waiting</span>   |    Low Opt <span style="color: blue;">Waiting</span>     |  Low Opt <span style="color: blue;">Waiting</span>   |   Low Opt <span style="color: orange;">Running</span>    |

I currently have a slot (16 cores from my available allocation) free and am going to see if I can get S2il optimising again, based on what I've learned so far from working with the S4il system. I'm starting with a PM7 optimisation then I'm going to use the same B97-3c/cc-pvtz (cc-pvtz/JK)

### 10:38 AM

Building the geometry and pre-optimising with MOPAC had the same issues as before, with it not allocating charge/spin properly, however I simplified the system and optimised as 0 1 instead (protonated the boron and didn't add the extra proton). These changes should result in minimal differences compared to the proper geometry, however if MOPAC can get me 80% of the way to a decent geometry, then that's better than trying to build the system by hand.

<span style="color: grey; text-align: center; font-style: italic;" class="center">Changes marked with a ==highlight==</span>

|           |                          S1                          |                          S2                          |                          S3                          |                          S4                          |
| --------- | :--------------------------------------------------: | :--------------------------------------------------: | :--------------------------------------------------: | :--------------------------------------------------: |
| **Gas**   |   Opt/Freq <span style="color: green;">Done</span>   |   Opt/Freq <span style="color: green;">Done</span>   |   Opt/Freq <span style="color: green;">Done</span>   |                         N/A                          |
| **Water** | Opt/Freq <span style="color: orange;">Running</span> | Opt/Freq <span style="color: orange;">Running</span> | Opt/Freq <span style="color: orange;">Running</span> | Opt/Freq <span style="color: orange;">Running</span> |
| **IL**    |  Low Opt <span style="color: blue;">Waiting</span>   | ==Low Opt <span style="color: red;">Queued</span>==  |  Low Opt <span style="color: blue;">Waiting</span>   | Low Opt <span style="color: orange;">Running</span>  |

## Wednesday, 16. September 2020

### 11:51 AM

S(1-3)aq have all optimised and are now on their frequency calculations and S(2/4)il are still optimising. I'm a bit concerned about those two jobs though, as I feel that they're having charge/multiplicity allocation issues, as in S2il, the $\ce{HF}$ and $\ce{BH3}$ are migrating towards each other and in S4il, one of the $\ce{BH4-}$ is getting awfully close to the $\ce{B-N-N-H}$ proton.

The current big issue, however, is that S4aq has stopped converging, which doesn't make sense to me, as it's the most simple aqueous system. Nothing looks odd int he geometry and nothing seems to be obviously wring in any of the calculations. Really, the geometry looks like a very healthy H-bonded water network.

## Thursday, 17. September 2020

### 9:31 AM

Progress is being made! We finally have IL systems optimising, and the first of the aq jobs has finished it's high opt/freq!

<span style="color: grey; text-align: center; font-style: italic;" class="center">Changes marked with a ==highlight==</span>

|           |                          S1                          |                           S2                            |                          S3                          |                          S4                          |
| --------- | :--------------------------------------------------: | :-----------------------------------------------------: | :--------------------------------------------------: | :--------------------------------------------------: |
| **Gas**   |   Opt/Freq <span style="color: green;">Done</span>   |    Opt/Freq <span style="color: green;">Done</span>     |   Opt/Freq <span style="color: green;">Done</span>   |                         N/A                          |
| **Water** | Opt/Freq <span style="color: orange;">Running</span> |  Opt/Freq <span style="color: orange;">Running</span>   | ==Opt/Freq <span style="color: green;">Done</span>== | ==Opt/Freq <span style="color: red;">Queued</span>== |
| **IL**    | ==Low Opt <span style="color: red;">Queued</span>==  | ==Low Opt <span style="color: orange;">Running</span>== | ==Low Opt <span style="color: red;">Queued</span>==  | ==Opt/Freq <span style="color: red;">Queued</span>== |

As for S4aq, I think I'm going to PM7 optimise it again and start it off, as it's just not cooperating

!!! note "Thoughts on the S4il debacle"
	I have noticed, that the S4il system that wouldn;t converge before, was trying to converge down in the $5800\:Eh$ territory, while this converged one has ended up at $4613\:Eh$. It makes me wonder what happened in the opt that the energy got that low, and how much of it was related to optimising with the Def2 basis sets.

### 10:28 AM

S4aq has been re-optimised at PM7 and has been re-queued, S3il and S1il have also been built, pre-optimised with PM7 and submitted as well.

### 1:18 PM

S3Iil hasn't been converging, so I'm running some tests locally to see if I can get it to behave. in the meantime, some of the other jobs have been picked up and are optimising cleanly.

<span style="color: grey; text-align: center; font-style: italic;" class="center">Changes marked with a ==highlight==</span>

|           |                           S1                            |                          S2                          |                         S3                          |                            S4                            |
| --------- | :-----------------------------------------------------: | :--------------------------------------------------: | :-------------------------------------------------: | :------------------------------------------------------: |
| **Gas**   |    Opt/Freq <span style="color: green;">Done</span>     |   Opt/Freq <span style="color: green;">Done</span>   |  Opt/Freq <span style="color: green;">Done</span>   |                           N/A                            |
| **Water** |  Opt/Freq <span style="color: orange;">Running</span>   | Opt/Freq <span style="color: orange;">Running</span> |  Opt/Freq <span style="color: green;">Done</span>   | ==Opt/Freq <span style="color: orange;">Running</span>== |
| **IL**    | ==Low Opt <span style="color: orange;">Running</span>== | Low Opt <span style="color: orange;">Running</span>  | ==Low Opt <span style="color: red;">Queued</span>== | ==Opt/Freq <span style="color: orange;">Running</span>== |

### 6:00 PM

I decided to try S3il with the PModel guess, since it gave the best initial guess for S4il, and it seems to have produced a more optimisable hessian. I'll keep an eye and see how it goes, but I have time to figure it out anyway, as the job is just running locally, since all my slots on MonARCH are full at the moment. S(1/2)aq should be finishing up soon though (within the next 6 hours), it's on the last few CP-SCF iterations for the Freq calc.

### 7:51 PM

There was a small issue where S4il's SOSCF took too large of a step and crashed, so I delayed the start of soscf from grad = 0.003 to 0.0003, and it's optimised through a couple of iterations since. S3il still isn't playing nicely, so I'm currently testing locally with an increased grid.

## Friday, 18. September 2020

### 8:55 AM

So I was wrong in my estimation and both S1aq and S2aq are still churning through CP-SCF calculations.

### 10:36 AM

There's only 10 hours and 14 hours left for those jobs so I really hope they finish in time, otherwise I'll need to restart the very long Freq calculations again...

### 4:56 PM

S2aq is done, but S1aq is still calculating with three hours left... I really don't think it's going to finish in time.

<span style="color: grey; text-align: center; font-style: italic;" class="center">Changes marked with a ==highlight==</span>

|           |                            S1                            |                          S2                          |                           S3                            |                          S4                          |
| --------- | :------------------------------------------------------: | :--------------------------------------------------: | :-----------------------------------------------------: | :--------------------------------------------------: |
| **Gas**   |     Opt/Freq <span style="color: green;">Done</span>     |   Opt/Freq <span style="color: green;">Done</span>   |    Opt/Freq <span style="color: green;">Done</span>     |                         N/A                          |
| **Water** | ==Opt/Freq <span style="color: orange;">Running</span>== | ==Opt/Freq <span style="color: green;">Done</span>== |    Opt/Freq <span style="color: green;">Done</span>     | Opt/Freq <span style="color: orange;">Running</span> |
| **IL**    |   Low Opt <span style="color: orange;">Running</span>    | Low Opt <span style="color: orange;">Running</span>  | ==Low Opt <span style="color: orange;">Running</span>== | Opt/Freq <span style="color: orange;">Running</span> |

### 8:36 PM

I'm a bit grumpy, because the Freq calc had probably about another 45 mins to go, but it just timed out after 4 days of running. I've set it off from the final geometry, so at least it won't have to re-optimise, though I'm fairly certain that the Freq calc is the more time consuming component. 

On the bright side though, S4aq has finished optimising and is currently going on it's freq calculation, with 3 days on the clock to do so. It's RHF at least, so it should be faster.

## Saturday, 19. September 2020

### 2:41 PM

The S2il and S3il jobs both had some pretty bad SCF convergence issues (energy dropping to $\sim1000\:Eh$ lower than it should and oscillating), so I'm now playing with keeping levelshifting on for longer and going back to the default guess. 

S4aq also crashed due to a filesystem error, which is unfortunate, but I guess is unavoidable (all the scratch directories are set up appropriately)

I also seem to be having some issues getting S(2/3)il to run, but I think that's just MonARCH being temperamental, as when I keep re-queueing, the jobs will eventually get allocated to a node that it will run smoothly on. I was warned that ORCA isn't the smoothest on MonARCH, but it's the only supercomputer that I have access to that has it installed.

<span style="color: grey; text-align: center; font-style: italic;" class="center">Changes marked with a ==highlight==</span>

|           |                          S1                          |                         S2                          |                         S3                          |                            S4                            |
| --------- | :--------------------------------------------------: | :-------------------------------------------------: | :-------------------------------------------------: | :------------------------------------------------------: |
| **Gas**   |   Opt/Freq <span style="color: green;">Done</span>   |  Opt/Freq <span style="color: green;">Done</span>   |  Opt/Freq <span style="color: green;">Done</span>   |                           N/A                            |
| **Water** | Opt/Freq <span style="color: orange;">Running</span> |  Opt/Freq <span style="color: green;">Done</span>   |  Opt/Freq <span style="color: green;">Done</span>   | ==Opt/Freq <span style="color: orange;">Running</span>== |
| **IL**    | Low Opt <span style="color: orange;">Running</span>  | ==Low Opt <span style="color: red;">Queued</span>== | ==Low Opt <span style="color: red;">Queued</span>== |   Opt/Freq <span style="color: orange;">Running</span>   |

!!! note "Personal aside"
	Unsurprisingly, not being able to get things to optimise is being a bit of an emotionally taxing experience, but I'm trying to keep things interesting/fun by optimising and running an epoxidation mechanism from one of my "Advanced Organic Chemistry" labs (purely out of self interest/curiosity).<br/>
	

	This is the TS/mechanism which despite being concerted is surprisingly hard to build/optimise for. I'm guessing there's just too many atoms that need to line up perfectly:<br/>
	
	![!](https://upload.wikimedia.org/wikipedia/commons/5/5d/Mcpbaepoxidation-updated.png){: style="width: 40%;" class="center"}<br/>
	
	Unfortunately, though this does mean that the epoxidation opt is running on my MacBook Air, as my computational machine is busy testing S3il.

### 3:00 PM

Just the levelshifting and guess wasn't enough, So I'm also testing with switching on SOSCF earlier. 

S(2/3)il have been picked up

<span style="color: grey; text-align: center; font-style: italic;" class="center">Changes marked with a ==highlight==</span>

|           |                          S1                          |                           S2                            |                              S3                              |                            S4                            |
| --------- | :--------------------------------------------------: | :-----------------------------------------------------: | :----------------------------------------------------------: | :------------------------------------------------------: |
| **Gas**   |   Opt/Freq <span style="color: green;">Done</span>   |    Opt/Freq <span style="color: green;">Done</span>     |       Opt/Freq <span style="color: green;">Done</span>       |                           N/A                            |
| **Water** | Opt/Freq <span style="color: orange;">Running</span> |    Opt/Freq <span style="color: green;">Done</span>     |       Opt/Freq <span style="color: green;">Done</span>       | ==Opt/Freq <span style="color: orange;">Running</span>== |
| **IL**    | Low Opt <span style="color: orange;">Running</span>  | ==Low Opt <span style="color: orange;">Running</span>== | ==Low Opt <span style="color: orange;">Running/</span><span style="color: purple;">Testing</span>== |   Opt/Freq <span style="color: orange;">Running</span>   |

### 10:31 PM

With increasing the time that levelshifting is on, S2il is now optimising, but S3il is still a little bit stuck. I'm going to leave it overnight, as it is VERY slowly decreasing in energy, but I'm not particularly hopeful. perhaps if SOSCF kicks in soon, it might help, but I'm not too sure.