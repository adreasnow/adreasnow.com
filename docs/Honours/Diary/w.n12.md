# Week n+12

## Sunday 19/9

### What I did today :

* lots of bench jobs have been finishing, so I've been extracting data to be able to process them
* I submitted the LB -2 jobs as well, since I have a TS for that, but I am genuinely suspecting that the LB is going to be acting as a base as well

## Monday 20/9

### What I did today :

* Meeting with Katya
* Kept just trying to push these jobs out
* Re-wrote all of my benchmarking pathway code to be more generalised and responsive, and as a result I found a whole bunch of little bigs that I squashed.

## Tuesday 21/9

### What I did today :

* Still trying to slam out these jobs
* It looks like the Lb detaches as soon as it takes the proton, activating the Brønsted base pathway, which is quite fast. I'm running an opt to now to see if the Lb stabilises the TS somehow

## Wednesday 22/9

### What I did today :

* Pushing jobs through still
* I'm suspecting that all the processes to get from lb2r to lb2t are barrierless, but that doesn't make sense, since the proton transfer is only favourable where the reaction coordinate is < 2Å, and I'm not entirely sure how to find that energy, as there doesn't seem to be a saddle point that I can optimise to.
* Okay, I'm running a whole stack of scans atm
  * Discovery
    * Scanning the reaction coordinate with the LB stabilising the TS
    * Scanning the proton transfer from the amine to LB at a distance from the reaction coordinate
    * <span style="color:red;">To do:</span> Scanning the proton transfer from the amine to the LB at a distance in to the reaction coordinate
    * Scanning the abstraction of the proton from the lb2r by pip- as a non-coordinating base
  * Production
    * Scanning the reaction coordinate with the proton fixed on the LB
    * Scanning the reaction coordinate with the proton fixed on the amine
    * Scanning the protonated pip leaving the molecule

## Thursday/Friday 23-24/9

### What I did today :

* Wrote figure captions
* Kept pushing jobs through
* Counselled friends that have been struggling through lockdown
* Kept writing... I actually got a decent chunk done, all things considered, but I'm still really not sure how to go about discussing the efield sections since a lot of it is just saying "yup, it matches the theory" and "yup, a dielectric stabilised the polarised species".
* I did make a decision to stop looking for the elusive lb2t TS. Seeing that the deprotonation of the amine by the LB is barrierless, it really only seems logical that the reaction is the more simple, stabilised Brønsted pathway.

#### Benchmark Matrix

| Pathway                     |             Pre -Transition State             |                Reactant                |                       Transition state                       |                Product                 |
| --------------------------- | :-------------------------------------------: | :------------------------------------: | :----------------------------------------------------------: | :------------------------------------: |
| Non-activated               |                                               | <span style="color:green;">done</span> |            <span style="color:green;">done</span>            | <span style="color:green;">done</span> |
| Brønsted Acid 1             |                    queued                     | <span style="color:green;">done</span> |            <span style="color:green;">done</span>            | <span style="color:green;">done</span> |
| Brønsted Acid 2             |                    queued                     | <span style="color:green;">done</span> |        scan - <span style="color:green;">done</span>         | <span style="color:green;">done</span> |
| Brønsted Base               |                    queued                     | <span style="color:green;">done</span> |            <span style="color:green;">done</span>            | <span style="color:green;">done</span> |
| Lewis Acid                  | scan - <span style="color:green;">done</span> | <span style="color:green;">done</span> |            <span style="color:green;">done</span>            | <span style="color:green;">done</span> |
| Lewis Base adding in        |                                               | <span style="color:green;">done</span> | cyc-proton-up-scan - <span style="color:green;">done</span> <br/>cyc-proton-down-scan - <span style="color:green;">done</span><br/>lb detaching scan - <span style="color:green;">done</span> | <span style="color:green;">done</span> |
| Lewis base as Brønsted base | scan - <span style="color:green;">done</span> |                 queued                 |                            queued                            | <span style="color:green;">done</span> |

