

# Week 5

## Sunday, 30. August 2020

### 9:40 AM

|           |                         S1                          |                        S2                        |                        S3                        |                         S4                          |
| --------- | :-------------------------------------------------: | :----------------------------------------------: | :----------------------------------------------: | :-------------------------------------------------: |
| **Gas**   |  Opt/Freq <span style="color: green;">Done</span>   | Opt/Freq <span style="color: green;">Done</span> | Opt/Freq <span style="color: green;">Done</span> |                         N/A                         |
| **Water** | Low Opt <span style="color: orange;">Running</span> | High Opt <span style="color: green;">Done</span> | High Opt <span style="color: green;">Done</span> |  High Opt <span style="color: green;">Done</span>   |
| **IL**    |   Low Opt <span style="color: red;">Stale</span>    |  Low Opt <span style="color: red;">Stale</span>  |  Low Opt <span style="color: red;">Stale</span>  | Low Opt <span style="color: orange;">Running</span> |

I appear to have made a Grotthuss simulator... This is NOT what I want! Why won't my boron stick!

<iframe class="center" width="560" height="315" src="https://www.youtube.com/embed/6rVhqdqKJs8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

New plan of attack for this system (S1aq) is to take the optimised geometry from S2aq as the starting geometry. I know the charge/multiplicity is correct for this system, so i'm guessing that the PM7 pre-optimisation just placed everything too close together, resulting in a 'oxygen and proton soup' rather than hydrated B-graphene.

Things aren't looking much better fo the IL systems though. I set up a test run using M06-2X to see if a double hybrid might work better, but it's so incredibly slow.

I've also set up a couple of other jobs, one testing using ma-Def2-TZVP with aug-cc-pvtz/JK fitting and another using aug-cc-pvtz with aug-cc-pvtz/JK. I'm really not sure at this point what the best course of action is.t the best course of action is.

## Monday, 31. August 2020

### 10:20 AM

Okay, so  everything is still failing and the M06-2X job took some really massive steps (like from $-4600\:Eh \to-18000\:Eh$) so I've gone back to the geometry and have used MNDOD to optimise S4IL, specifically because MNDOD will cause all the fragments to spread apart. I'm hoping that if the geometry starts from a more diffuse geometry, it might be able to optimise in to  a better geometry without too much trouble. For this I've gone back to B87-3c/ma-Def2SVP AutoAux, though I've also switched on SOSCF. The results are actually really promising so far, down at 1e-6 ΔE in 20 steps. Fingers crossed that this continues as the optimisation proceeds.

|           |                        S1                        |                        S2                        |                        S3                        |                         S4                          |
| --------- | :----------------------------------------------: | :----------------------------------------------: | :----------------------------------------------: | :-------------------------------------------------: |
| **Gas**   | Opt/Freq <span style="color: green;">Done</span> | Opt/Freq <span style="color: green;">Done</span> | Opt/Freq <span style="color: green;">Done</span> |                         N/A                         |
| **Water** | Low Opt <span style="color: green;">Done</span>  | High Opt <span style="color: green;">Done</span> | High Opt <span style="color: green;">Done</span> |  High Opt <span style="color: green;">Done</span>   |
| **IL**    |  Low Opt <span style="color: red;">Stale</span>  |  Low Opt <span style="color: red;">Stale</span>  |  Low Opt <span style="color: red;">Stale</span>  | Low Opt <span style="color: orange;">Running</span> |

## Tuesday, 1. September 2020

### 1:47 PM

So I've been thinking about the solvent model and whether or not CPCM is sufficient for these jobs, so I did some searching and found a paper looking in to SMD for ILs! [^1] While this talks about a new model of SMD that's designed for ILs, I mostly just took the solvent parameters from the supplementary info for standard SMD in ORCA. Am testing now.

```fortran
%cpcm
   smd true
   refrac 1.4098
   epsilon 12.8
   rsolv 2.8
   SMDsolvent "2-METHYLPYRIDINE" #you need to put soething in here, even if setting everything else manually
   soln 1.4098
   soln25 1.4076
   sola 0.229
   solb 0.265
   solg 78.30
   solc 0.231
   solh 0.308
end
```



Also: holy crap that is some thorough supplementary info, I love it! Shame they used Gaussian though...

[^1]:(1)  Bernales, V. S.; Marenich, A. V.; Contreras, R.; Cramer, C. J.; Truhlar, D. G. Quantum Mechanical Continuum Solvation Models for Ionic Liquids. *J. Phys. Chem. B* **2012**, *116* (30), 9122–9129. https://doi.org/10.1021/jp304365v.

## Wednesday, 2. September 2020

### 9:46 AM

So things have started to pick up again!

The current working input seems to be this:

```fortran
! Opt b97-3c ma-def2-svp aug-cc-pvtz/jk CPCM nososcf

%maxcore 4096
%pal
   nprocs 16
end

%cpcm
   epsilon 13.9
   refrac 1.413
end
```

I'm not entirely sure why, but switching off SOSCF seemed to stop the computation from taking really bad steps, but I think the bigger thing is using the aug-cc-pvtz/JK auxilliary basis set instead of generating one with AutoAux.

my only big concern here though is the energy is optimising to about -4607 Eh, when with SOSCF it seems to be reaching down to -4610 to -4612 Eh, I'm not sure how concerned I should be that the SCF insn't optimising to a true global minimum.

I still want to wait for the S4il to optimise first, then I'll optimse for the other IL systems, then I'll choose my theory for the high opts and thermals. I want to be sure that I'm not re-running jobs over an over with no chance of them being usable.

### revPBE vs B97-3c

From what I'm seeing, the main difference in their behaviour is revPBE-D3BJ seems to be calculating an ~3 Eh lower electronic energy than B97-3c, but it's also much slower and seems to not be converging as quickly. The aug-cc-pvtz/JK aux basis also doesn't seem to work with it for some reason, so the AutoAux basis might be causing these issues, but even if that is the case, it's not seeming to be a great choice.

### SMD vs CPCM

I will say that both SMD and CPCM seem to be behaving pretty similalry at this point, but given that CPCM is faster, the parameters are better understood/documented for ILs and that everything else has already been run in CPCM, it seems like a better way to go.

From my personal experience, as well I've found that SMD can really disrupt intermolecular interactions in ways that CPCM doesn't.

### 1:45 PM

Perhaps I spoke too soon about revPBE-D3BJ vs B97-3c, revPBE is now on geom iteration 10, where B97-3c is stuck on iteration 5 ​(​S​C​F​ ​it​e​r​a​ti​o​n​ ​2​0​7​)​ :thinking:. I'll let them keep running and see if there's any changes.

Literally just as I wrote this, revPBE decided to mix things up a little :unamused:... I should probably stop watching the logs, it's too anxiety provoking:

```
 19  -4609.1200693591  -0.0443124555022087646.63158196 5530.81157707  0.0716057 0.0000
               *** Restarting incremental Fock matrix formation ***
                                   *** Resetting DIIS ***
 20  -4608.3707606258   0.7493087333085359445.06106154 9837.16609651  0.0713075 0.0000
 21  -4606.1928598695   2.17790075630320859150.70449696 30963.87744793  0.0522674 0.0000
 22  -4536.1088019772  70.08405789222520246368.36299115 31257.73801661  0.0204063 0.0000
 23  -4593.2978704035 -57.18906842624252838.94273470 124.76842176  0.0572140 0.0000
 24  -4593.2761626367   0.021707766733137748.75869951 294.71001562  0.0556001 0.0000
 25  -4592.5091302586   0.7670323781301293670.41756438 3711.36743121  0.0570989 0.0000
 26  -4575.6708118409  16.8383184176976721.55447187 14.32127393  0.1529516 0.7000
```

On a side note, It really does suck that the Basis Set Exchange doens't have any augmented J or JK fitting basis sets.

## Friday, 4. September 2020

### 10:40 AM

So things have taken a bit of a turn for the worse... The SCF of the revPBE-D3BJ test is oscillating all over the place and the B97-3c job has optimised to an insanely low number[^2]. I'm leaving them running for now, mostly because I'm curious to see what they do. I've fired off a couple of new jobs from the same geometry, both ar ethe same as the B97-3c job, however on has a tz basis and the other has SOSCF switched on. 

Already at iteration 11 the SOSCF job seems to be rapidly decreasing in energy, so perhaps there is just a really low energy trajectory (kind of cool that the energy is decreasing as the ILs are coming closer together). The tz job is also decreasing, though the iterations take longer, so the extent of this is less apparent.

[^2]:Interestingly, this is the same thing that the M06-2X job did, so I'm curious to know if this is actually a good thing..

### 2:11 PM

Unsurprisingly, the SOSCF job has failed. 

### 8:53 PM

I was on the Pas Group Slack and someone asked a question about level shifting, which was a massive slap in the face, since it's exactly what this IL system needs. The IL jobs that were running this morning are still on the same SCF procedure (iteration 2000-3000... I should probably put them out of their misery), as is the tz job that I kicked off (iteration 500). I also wanted to try something else and set off another job, the same as the original S4il job, but with a more fine DFT grid. The jobs look like this:

#### Level Shifting
```
! Opt B97-3c ma-def2-svp aug-cc-pvtz/jk CPCM nososcf

%scf
   Shift Shift 0.1 ErrOff 0.1 end
end
```

#### Finer DFT Grid
```
! Opt B97-3c ma-def2-svp aug-cc-pvtz/jk CPCM nososcf grid5
```

At this point in time (9:27 PM) the grid5 job seems to be stalling a bit, while the level shifting job seems to be powering on still. Hopefully things will look good in the morning!

## Saturday, 5. September 2020

### 9:43 AM

The jobs are still going well, though as the systems are contracting, it's taking more SCF cycles to converge them. I've just fired off another job from the most optimised geometry, that uses both level-shifting and a finer DFT grid.

### 10:43 AM

The combination of the two methods together seems quite fast, but I'm going to leave them all runnning for now to see what happens.

### 1:12 PM

I've just set off the aqueous jobs for Opt Freq with the following input. I'm pretty comfortable sticking with B97-3c from what I'm seeing, and the ma-Def2 basis sets seem to be good, so I'll increase the grid, ensure they're all using TZ basis sets and set them off one last time!

```
! Opt Freq b97-3c Def2-TZVP Def2/J CPCM(water) tightopt tightscf grid6
```

