#       Week n+4

## Monday 26/7

### What I did today:

* After my meeting with Katya there's a few things I need to do:
  * Generate MESPs for the efield perturbations
  * Potentially redo the relaxed efield perturbations with a more appropriate integration grid for M06-2X
  * Redo all the benchmarks in Psi4, since ORCA isn't behaving nicely
* We've decided to not use DCA as an anion, which makes my job slightly easier :slightly_smiling_face:
* I generated the MESPs and put them into the PyMOL project
* I tweaked the script builder job
* I submitted the better scan jobs which are doing their thing
  * I might actually cancel and resubmit these with MESP generation...
  * ^this has been done
* I spent a fair amount of time trying to figure out how to extract a clustered trajectory from the dcd files with mda, but I think it's probably not the best method.
* ~~I've set off my MD generator script and it is now building and queueing jobs!~~
  * I've suspended these jobs, only because when the IL test jobs finish tomorrow, I want to be able to get them straight back on.

## Tuesday 27/7

### What I did today:

* All the test runs timed out as expected, so I restarted them, making sure to specify to use P100 gpus so they should finish within 24 hours.
* Submitted all the jobs I generated yesterday :sweat_smile:
* Worked on finding decent cavities for PCMSolver, which meant troubleshooting compiling geomview, before I learned that nothing else can read `.off` files... except for https://3dviewer.net :unamused:
  * I settled on using a cavity area of 0.9
* Tweaked the benchmark jobs and brushed up on SCF algorithms to try and speed them up/prevent them from oscillating.
  * I settled on using SOSCF, but we shall see how effective that is... (It works for ORCA)
* Mostly spent a lot of time troubleshooting XQuartz again, and also jupyterlab...
* I noticed that the temperatures of the jobs is closer to 200-230K when I'm specifying 343K for the thermostat, trying to follow up on this with Tom or Michael, but it's late.
  * This is because the reported temperature is the average of the temperature of all the particles, which Drudes have their own thermostat that keeps them at ~2K

## Wednesday 28/7

### To do:

* [x] RDFs of ILs
* [x] Load all geometry into PyMOL
* [x] Update running jobs 


### What I did today:

* I wrote a script to load all the geometries into PyMOL in different states to make it easier to browse their respective geometries
  * This should easily be extended to loading in ESPs 
* I wrote an RDF generation script that uses MDAnalysis, which is much faster than TRAVIS
* I had a collaborator meeting in which Michelle was really happy with the work I've done and wants to get it into a paper, but now I'm feeling overwhelmed
  * So I just sent an email to Katya about feeling overwhelmed
* The IL pMD jobs have begun to run at speeds of ~50-55ns/day, which should mean they'll take just over two days to complete which is reasonable
* I managed to get MDAnalysis cluster selection and exporting working! and I managed to speed up the `.dcd` to `.pdb` conversion process, and I managed to get the geometry to read properly in pymol
* The RDFs I'm getting form MDAnalysis don't feel quite right, so I'm trying again with TRAVIS to see if looks any different.
  * This didn't but I realised the error. I was computing all atoms of one molecule against thee other, as opposed ot sat the N-S distance.
  * I also used mdtraj as per Tom's suggestion which made this process so much faster!
  * Using both of these things, I'm still not seeing any difference between the two IL test jobs, but I think it might have something to do with the constant acceleration. If I compare that RDF to one of the in progress na1* jobs, I *do* see a difference!
* I also forgot that I need to do comparative MD between field off and on, so I've queued up those jobs as well!

  * I might also get them queued on M3 just in case they get picked up there sooner... - done
  * I also noticed that my MonARCH jobs weren't submitted under partner, so I've fixed that up



!!! info "From meeting with Michelle"
	**For a paper! (Special edition of PCCP?)**<br/>
	Based on analysis, we want an e-field pointing *this* way...
	

	When we do, we get a rate increase of X resulting in kinetics of Y
	
	What will give the best selectivity between the two?... (biggest ΔE) <br/>
	If we only want R?... (biggest S barrier)<br/>
	If we only want S?... (biggest R barrier)<br/>
	
	Then Michelle can demonstrate how to get this through functionality <br/>
	Then Joseph can test this experimentally<br/>
	this can then be explored thorugh a Hammett study to detemrine the effectiveness of the susbtituent
	
	To turn this into a paper then we need to do this for a few derivatives
	
	Then do this in multiple solvents to demonstrate that polar solvents prevent this and that non-polar solvents help this and there's a midpoint between the two of solubility and effectiveness
	
	Use the Check [JOC paper](https://pubs.acs.org/action/showCitFormats?doi=10.1021/acs.joc.1c01032&ref=pdf) that Michelle just did on the Aldol reaction as a guide



## Thursday/Friday

### What I did today:

* I did do things... I just haven't been feeling the best.
* I worked on pymol scripts and analysis of the efield scans mostly

### Benchmark Matrix

| Job                           | na1r - r | na1t - r | na1p - r | na1r - s | na1t - s | na1p - s |
| ----------------------------- | :------: | :------: | :------: | :------: | :------: | :------: |
| Non-catalysed benchmark       |  queued  |  queued  |  queued  |  queued  |  queued  |  queued  |
| R benchmark (static)          |  queued  |  queued  |  queued  |  queued  |  queued  |  queued  |
| S benchmark (static)          |  queued  |  queued  |  queued  |  queued  |  queued  |  queued  |
| Catalysed benchmark (relaxed) |          |          |          |          |          |          |
| R benchmark (relaxed)         |          |          |          |          |          |          |
| S benchmark (relaxed)         |          |          |          |          |          |          |



### MD Run Matrix     

| IL                                                |                 na1r-r                 |                na1t-1-r                |                na1t-2-r                |                na1t-3-r                |                 na1p-r                 |                 na1r-s                 |                na1t-1-s                |                na1t-2-s                |                na1t-3-s                |                 na1p-s                 |
| ------------------------------------------------- | :------------------------------------: | :------------------------------------: | :------------------------------------: | :------------------------------------: | :------------------------------------: | :------------------------------------: | :------------------------------------: | :------------------------------------: | :------------------------------------: | :------------------------------------: |
| $\il{C4mpyr}{OTF} - \vec F =0.1\:V\cdot\AA^{-1}$​​​​  |              ==running==               |                 queued                 |                 queued                 |                 queued                 |                 queued                 |              ==running==               |                 queued                 |                 queued                 |                 queued                 |              ==running==               |
| $\il{C4mpyr}{MSO4} - \vec F =0.1\:V\cdot\AA^{-1}$​​​ | <span style="color:green;">done</span> |              ==running==               |              ==running==               |              ==running==               | <span style="color:green;">done</span> | <span style="color:green;">done</span> | <span style="color:red;">failed</span> |              ==running==               |              ==running==               | <span style="color:green;">done</span> |
| $\il{C4mpyr}{TCM} - \vec F =0.1\:V\cdot\AA^{-1}$​​  | <span style="color:green;">done</span> | <span style="color:red;">failed</span> | <span style="color:green;">done</span> | <span style="color:green;">done</span> | <span style="color:green;">done</span> | <span style="color:red;">failed</span> | <span style="color:green;">done</span> | <span style="color:green;">done</span> | <span style="color:red;">failed</span> | <span style="color:green;">done</span> |
| $\il{C4mpyr}{OTF} - \vec F =0.0\:V\cdot\AA^{-1}$​​​  |                 queued                 |                 queued                 |                 queued                 |                 queued                 |                 queued                 |                 queued                 |                 queued                 |                 queued                 |                 queued                 |                 queued                 |
| $\il{C4mpyr}{MSO4} - \vec F =0.0\:V\cdot\AA^{-1}$​​​ |                 queued                 |                 queued                 |                 queued                 |                 queued                 |                 queued                 |                 queued                 |                 queued                 |                 queued                 |                 queued                 |                 queued                 |
| $\il{C4mpyr}{TCM} - \vec F =0.0\:V\cdot\AA^{-1}$​​  |                 queued                 |                 queued                 |                 queued                 |                 queued                 |                 queued                 |                 queued                 |                 queued                 |                 queued                 |                 queued                 |                 queued                 |

