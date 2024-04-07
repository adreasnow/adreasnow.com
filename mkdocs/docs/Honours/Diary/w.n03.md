# Week n+3

!!! note "Current milestone"
	Presentation<br/>The project has yet again pivoted, so I'm really putting this off until such a time as I know when I'm due to present.

## Monday 19/7

### From meeting with Katya:

* We're going to switch from DCA to MeSO4 for our third il, giving us:
  * ~~No dipole - $\il{C4mpyr}{PF6}$~~ No dipole - $\il{C4mpyr}{TCM}$
  * Mid dipole - $\il{C4mpyr}{OTf}$
  * Big dipole - $\il{C4mpyr}{MeSO4}$
* The project has officially pivoted to stereocontrol, and we (as of the moment) haven't got a good protocol for comparing MD energies. Katya and Michelle weren't happy with Luke's approach in the JACS paper.
* Katya wants me to start equilibrating geometries in the ILs and wants me to do both the R and S isomers of the TS, possibly at multiple different $\ce{N-C}$ bond lengths...
* Okay... So I'm a bit frustrated, but I've resorted back to TCM for the non-dipole one, as $\il{C4mpyr}{PF6}$ has a $T_m$ of $87^\circ $c, making it impossible to get useful densities and meaning that we'd have to run the sims at crazy high temps.

### Bong length selection

These were determined by finding the difference between the bond lengths in na1t and na1p.

* For N0E-C0B
  * Half of this length was subtracted from the TS to give na1t-1
  * The TS geometry was used for na1t-2
  * Half of this length was added to the TS to give na1t-3
* For C0J-N0E
  * The subtractions and additions were reversed.

| Bond    | na1t-1 | na1t-2 | na1t-3 |
| ------- | :----: | :----: | :----: |
| N0E-C0B | 1.873  | 1.760  | 1.648  |
| C0J-N0E | 1.448  | 1.453  | 1.459  |

## Tuesday 20/7

### What I did today:

* Kept pushing through the $k_{ij}$ jobs for MSO4 and TCM
* Re-ran the c4mpyr-otf MD bench with the more real polarisabilities (my bad...)
* Today I've mostly been trying to get out these $k_{ij}$ parameters
* I ran into a few issues that seem to have been fixed by not using $k{ij}$ scaling though, so I'm running all my ILs at 343.15K and will check their densities and viscosities to see how well they behave. I'm currently running $\il{c4mpyr}{dca}$ and $\il{c4mpyr}{otf}$ with $\il{c4mpyr}{tcm}$ and $\il{c4mpyr}{MSO4}$ queued. Their densities are looking spot on for the time being though!
* Found thermophysical data for all of the ILs in question at 343.15K, or data that is exrapolatable to 343.15K
* Since all of the relevant ion-ion $k_{ij}$ parameters have been generated, I've also set off all of the scaled forms of the MD runs, so I should be able to compare them equilibrated to each other :)

## Wednesday 21/7

### What I did today:

* Collaborator meeting - nothing to report...
* Trying to fix the scaling issues, I'm going to:
  * Re-optimise with M06-2X Def2-TZVP
  * Scan the interaction difference with SAPT0
  * Re-run the SAPT2+ interaction energies
* I wrote up the SAPT0 scan script
* Set off all the reopt jobs (c4mpyr-anion and na1r-ion... I'm not going to bother with ion-ion interactions for now)
* I am also re-running the relaxed efield scan jobs, as my field wasn't continuous and running the jobs again locally, I got results that were more in line with my expectations. I've bumped up the memory and am also spitting out geometries of the optimised structures now
* I had a bit of a think about it and thought that perhaps it was my cation-cation and anion-anion $k_[ij]$ parameters that were making the system too thin, so I disabled them on the $\il{c4mpyr}{otf}$​ system and it started behaving properly, with scaling on, so I've restarted all of the scaled jobs without the self interaction terms to see how they all behave.

## Thursday 22/7

### What I did today:

* I did do stuff, I swear! I just don;t remember what :slightly_frowning_face:

## Friday 23/7

### What I did today:

* Today I had a look back at some of my tests from the past little while and have realised that I was getting better results without using the SAPT scanning method, so I've finished off the $k_{ij}$​​ parameterisation based on the old method and am now running some final baseline tests of the MD simulations with and without an electric field ($0.1\:V/\AA$)
  * 10ns npt
  * 10ns nvt equilib
  * 100ns nvt production
* I am calling parameterisation pretty much done, which is insanely cool!
* I'm also doing some more fine grained efield perturbations of the difference between R and S on fixed geometry, so that I can get some simple benchmark data of what's possible
* The relaxed scans did something similar again where the field doesn't appear to be continuous. I'll chat with Katya about it on Monday, but it's why I'm focusing on the benchmark calculations instead
* I just submitted fixed geometry benchmark calcs with the efield

#### Running Jobs:

* MD Runs (MonARCH)
  * MD IL tests (10,10,100 +/- 0.1V/Å)
  * MD IL spawner test job
  * MD na1t-2-s in IL orienting with the field (proof of concept)
* Efield scans
  * Fixed geom efield scans (R/S) (MonARCH)
* Benchmark Jobs
  * Relaxed perturbed bench jobs (M3)
  * Fixed perturbed bench jobs (MonARCH)

## Saturday 24/7

### What I did today:

Yeah, I know it's Saturday but I did do a little bit of job management

* The precise, static efield scans finished so I set off the static perturbed bench jobs
* I've mostly spent my day trying to get openmmVV working under WSL :unamused:

#### Running Jobs:

* MD Runs (MonARCH)
  * MD IL tests (10,10,100 +/- 0.1V/Å)
  * MD IL spawner test job
  * MD na1t-2-s in IL orienting with the field (proof of concept)
* Benchmark Jobs
  * Relaxed perturbed bench jobs (M3)
  * Fixed perturbed catalytic bench jobs (MonARCH)
  * Fixed perturbed stereoselection bench jobs (R - MonARCH, S - MonARCH & M3)

### Na1 Parameterisation Progress Matrix

| Task                         |        na1r        |        na1t        |        na1p        |
| ---------------------------- | :----------------: | :----------------: | :----------------: |
| MP2 Opt (gas)                | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Molecular polarisability     | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Atomic polarisability        | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| $k_{ij}$                     |  See matrix below  |        N/A         |        N/A         |
| LigParGen                    | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Check params (minimise test) | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| POLAR section                | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Flip stereo                  | :white_check_mark: | :white_check_mark: | :white_check_mark: |

### $k_{ij}$/pol Parameterisation Matrix

|                |        na1         |   $\ce{C4mpyr+}$   |    $\ce{OTf-}$     |    $\ce{TCM-}$     |    $\ce{MSO4-}$    |    $\ce{DCA-}$     |
| -------------- | :----------------: | :----------------: | :----------------: | :----------------: | :----------------: | :----------------: |
| na1            |                    | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| $\ce{C4mpyr+}$ | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Polarisability | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |



