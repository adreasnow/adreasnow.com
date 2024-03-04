# Week n+5

## Tuesday 3/8

I've been getting really slack with this

### What I did today (and yesterday):

* I had my meeting with Katya in which she suggested that I should drop the IL component for now, spend the next month just getting the data for the PCCP paper, and then write my thesis, ready to hand in with everyone else in November
* I've been trying to get the scans and benchmarks through, but the queues seem to be a bit crazy atm.
* Things have been a bit crazy and I've been all over the place, hence not really updating my diary much :confused:
* I've been really struggling with picking a high accuracy functional for the energetics of my system
  * ωB97X-D3 is my current default based on Katya's suggestions, however looking at Martin Head-Gordon's recent "30 years of DFT" paper:
    * ωB97M-V is the best performer and is equivalently cheap and converges really nicely,
    * M08-SO seems to perform the best for barrier heights
  * The problem is that neither the *-V,  nor the M08 functionals have analytical gradients, so they won't optimise properly in Psi4, and the frequency calcs will take forever with the 160+ DoF



## Wednesday 4/8

### What I did today:

* Mostly tested functionals and compared performance, though at the collaborator meeting, it was decided that I should use M06-2X/6-31+G(d) with SMD. The only issue is that this really restricts what software I can use, as SMD is only available in ORCA, (which has been banned) Gaussian, GAMESS
* Based on Sheik's paper (Wang2018) I shouldn't actually need frequency calculations to show these trends, though I might get them running anyway...

## Thursday 5/8

I've been a tiny bit more productive today, despite feeling even more brain-fuzzy than usually. I'm heading in to uni for a TA prac info session, and am working on the train.

### What I did today:

* The Gaussian bench jobs haven't really been working, so I've been troubleshooting them. As usual, Gaussian would rather just segfault than tell you what the issue is, so it's been a lot of troubleshooting.
* The efield scans results that I was getting out suddenly dropped by $>100\kjmol$ so I'm re-running those jobs and setting the optimisation dynamic level to only change after the initial optimisation has been completed.
  * I also put in the optimised geometry at this change in job, so if it still fails, I'll put in the old geometry
  * The weird thing is though that this would have to mean that either the perturbed geometry is optimising much lower under `dynamic_level 2`, or that the base geometry is optimising much higher... I'm honestly not sure which it is, but I'd definitely rather not have to re-do these scans again!
  * For the sake of consistency, I'm starting form the old geometry again...
* I want to set up some high level benchmarking calcs, Perhaps CBS-QB3, as suggested by Michelle? to make sure that M06-2X/6-31+G(d) is actually acceptable, but I'm not sure if I should be doing them solvated or not. I suspect that I need to be comparing gas to gas.
  * I Might ask Katya if I should do this, or perhaps some DLPNO-CCSD(T)/CBS instead...
* The efield scan results are being really weird which seems to be triggered by changing the optimiser dynamic level. I compared the energy of the base molecule and it's off by $0.0001\kjmol$, so the optimiser must be pushing the perturbed molecule harder...
  * I'm going to re-start the scans again, but I'm going to take the opportunity to use M06-2X/6-31+G* which should make the scans absolutely fly
    * It's fast, but it could/should be faster :stuck_out_tongue:
    * I'm guessing this is because it's probably using a pretty big JKFIT basis set 

## Friday 6/8

### What I did today:

* I've mostly been trying to get these gaussian benchmarking jobs through, as I remembered last night that Gaussian uses an inverted description of an electric field, so that's been taking some time.
* I noticed that the catalytic jobs are all completing with lots of negative frequencies through which makes me thing that they really need to be re-optimised in the electric field. As such I've also set up and queued those jobs, though this will obviously take much longer to complete.
* I've moved the efield scans to the non-partner queue as well, to help them try and get through

### MD Run Matrix     

| IL                                                |                 na1r-r                 |                na1t-1-r                |                na1t-2-r                |                na1t-3-r                |                 na1p-r                 |                 na1r-s                 |                na1t-1-s                |                na1t-2-s                |                na1t-3-s                |                 na1p-s                 |
| ------------------------------------------------- | :------------------------------------: | :------------------------------------: | :------------------------------------: | :------------------------------------: | :------------------------------------: | :------------------------------------: | :------------------------------------: | :------------------------------------: | :------------------------------------: | :------------------------------------: |
| $\il{C4mpyr}{OTF} - \vec F =0.1\:V\cdot\AA^{-1}$​​​​  | <span style="color:green;">done</span> | <span style="color:green;">done</span> | <span style="color:green;">done</span> | <span style="color:green;">done</span> | <span style="color:green;">done</span> | <span style="color:green;">done</span> | <span style="color:green;">done</span> | <span style="color:green;">done</span> |              ==running==               | <span style="color:green;">done</span> |
| $\il{C4mpyr}{MSO4} - \vec F =0.1\:V\cdot\AA^{-1}$​​​ | <span style="color:green;">done</span> | <span style="color:green;">done</span> | <span style="color:green;">done</span> | <span style="color:green;">done</span> | <span style="color:green;">done</span> | <span style="color:green;">done</span> | <span style="color:red;">failed</span> | <span style="color:green;">done</span> | <span style="color:green;">done</span> | <span style="color:green;">done</span> |
| $\il{C4mpyr}{TCM} - \vec F =0.1\:V\cdot\AA^{-1}$​​  | <span style="color:green;">done</span> | <span style="color:red;">failed</span> | <span style="color:green;">done</span> | <span style="color:green;">done</span> | <span style="color:green;">done</span> | <span style="color:red;">failed</span> | <span style="color:green;">done</span> | <span style="color:green;">done</span> | <span style="color:red;">failed</span> | <span style="color:green;">done</span> |
| $\il{C4mpyr}{OTF} - \vec F =0.0\:V\cdot\AA^{-1}$​​​  |                 queued                 |                 queued                 |                 queued                 |                 queued                 |                 queued                 |                 queued                 |                 queued                 |                 queued                 |                 queued                 |                 queued                 |
| $\il{C4mpyr}{MSO4} - \vec F =0.0\:V\cdot\AA^{-1}$​​​ |                 queued                 |                 queued                 |                 queued                 |                 queued                 |                 queued                 |                 queued                 |                 queued                 |                 queued                 |                 queued                 |                 queued                 |
| $\il{C4mpyr}{TCM} - \vec F =0.0\:V\cdot\AA^{-1}$​​  | <span style="color:green;">done</span> |              ==running==               |              ==running==               | <span style="color:red;">failed</span> | <span style="color:red;">failed</span> |              ==running==               |              ==running==               |              ==running==               |              ==running==               |              ==running==               |

