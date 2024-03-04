# September 2022

## Thursday 1st September

I've plonked on a friend's couch today and have been working away, but the QMMM issues are getting a bit frustrating. I'm nit entirely sure what form the LJ potential takes when specifying the parameters inline in the qchem input file.

I've also been trying to get some reading in post-lunch, which is a bit difficult given the technical understanding required for non-electrostatic term modelling. 

I think I'm also going to need to dedicate some time to finding gas-phase emission and excitation energies for my dataset, so that i can validate the functionals themselves.

!!! note
	I just came to a realisation... the frequency in the "frequency dependent polarisability" is the frequency of the wavefunction, so all of the excited states
	

	Edit: I am not so sure of this anymore...

Okay... So it's 12:30am and I found an issue a couple of hours back that's screwed up a lot of my data, so I've been frantically hand cleaning everything up, updating my scripts, writing better functions and queueing new jobs to try and fix the issue :unamused:

I'm also running on **very** little sleep rn, so it's very probably that's I've made a big mistake somewhere in my work tonight :sweat_smile:



## Monday 5th September

It's been a few rough days but I'm back working now. I think I need to figure out this gas phase issue, because I need to be able to quantify the gas --> pcm error as well as the exp --> pcm error for each species specifically.

Can we use some highly correlated levels of theory, such as ADC(2) or EOM-CCSD to get gas phase results to compare our TDDFT results to? [looks like they could be around the 0.01eV error mark?](https://pubs.acs.org/doi/10.1021/acs.jctc.5b00619)

* There doesn't seem to be much benchmark data about the geometries produced from correlated levels for **fluorescence**. there is plenty for absorbance.
* The optimisation for the ground state is therefore easy for the absorbance situation since any correlated method with analytical gradients will do. For excitation, the methods for excited states I can find include:
  * Psi4/Q-Chem - EOM-CCSD
  * Pretty much everything - CIS

## Tuesday 6th September

Tomorrow I'm going in for surgery so I might not get a huge amount done today. I'm going to try and get one lot of marking out though...
[Nile Red paper](https://chemistry-europe.onlinelibrary.wiley.com/doi/10.1002/chem.201601570)



Estimating the memory needed for Q-Chem ccsd calcs:

* Memory halves if using the CCMAN2 module
* Memory doubles for EOM-CCSD
* `MEM_STATIC` should not exceed 2000 MB (500 MB is reccomended)
* Set `CC_MEMORY` instead and `MEM_TOTAL` (includes `CC_MEMORY`)
  * Reduce `CC_MEMORY` if you want to use disk based methods

$$
\text{Memory}=\frac{(\text{\#basis funcs})^4}{131072}MB
$$

This would be great, if QChem *actually* supported EOM-CCSD analytical gradients like the manual said it does...

## During my post surgical sick leave

I'm re-watching 3Blue1Brown's eigenvectors and eigenvalues video to get a better understanding for the idea of "roots" and I think it's starting to click for now.

If our wavefunction is our eigenvector, and the resulting property is spits out is our eigenvalue, then the roots are all the different solutions to the equation (combinations of wavefunction and property that make the $\hat H\Psi=E\Psi$ relationship true).

To solve this the fully, we'd have to create a big polynomial for all the roots, so I'm guessing that the Davidson solvers are ways to iteratively calculate the eigenvectors and eigenvalues for the lowest roots, corresponding to only the $n^{th}$ lowest states. The lowest state would then be the ground state for that specific multiplicity with all higher roots being electronic excited states.



I've been playing with getting Texifier (Texpad) running on my iPad for low-distraction writing...



I've also been playing with Psi4 EOM-CCSD optimisation, and trying to figure out how much memory I'll need for each job. Unfortunately, at aug-cc-pvdz, the memory ranges go from 190 GB to 1.4 PB... even if I were to store those matrices on disk, I'd need an insane amount of disk space to do that.

My estimation function looks like $\text{mem}_{Gib}=10^{(0.005792037\times\text{\#basis funcs}-0.083739137)}$

I'm also doing a little test, to see if calculating for more roots improves the diagonalisation accuracy in the EOM-CCSD calculations.

* This seems to be a non-thing? At least for the transition energy to 4 s.f. the energy is identical when calculating 2 or 4 roots.

#### From Michelle's Talk

I really need to remember this eqn...

* Where $r=$ distance, $\theta=$ dipole interaction angle, $\mu=$ dipole

$v(r,\theta)=-\frac{q\mu\cos\theta}{4\pi\varepsilon_0\varepsilon}$

## Wednesday 21st September

First day back (I thought it was going to be Monday :unamused:) I've been kicking off some failed jobs now that I've identified some issues in my restart codes...

I'm also running a couple of EOM-CCSD tests to see if I can get Psi4 to be able to run the calculations on disk rather than in memory, and I'm also running a little test to see how Gaussian performs with an EOM-CCSD opt as well. As much as it pains me, it's worth a shot, since it supports analytical gradients.

I know it's IPR time for me though, so after I'm done with breakfast, I'm going to head to the city and try to focus on getting some reading done. That PCM review is still needing a bit of attention (It's VERY long, very dense, and pretty much all of it is important/relevant to me... Maybe I should get it printed and bound)

## Friday 23rd September

Wooo!!! Just finished the Herbert review :smile:

## Tuesday 27th September

I have just found some beautiful reosurces!!!

* http://www.fluorophores.tugraz.at/substance/
* https://omlc.org/spectra/PhotochemCAD/

## Wednesday 28th September

Heading back in to the office again today (trying to make a regular habit of it), and on the way in I realised that there probably isn't an experimental analogue that can be used a reference, since all the species would need to be ionised to get them into the gas phase. We could potentially model the ionised form in our studies though, but that would be adding a selection bias.

## Thursday 29th September

S-HPC user's meeting today, so probably not a huge amount of research is going to happen.

## Friday 30th September

Today is a bit of a weird one. I've been trying to find more gas phase fluorescence experiments that I can use as reference points, but I am really struggling to find anything useful. I'm currently testing one basic BODIPY species to see how close my EOM-CCSD/aug-cc-pvdz calc can get. it's not the most useful test, since this is the largest molecule that fits within a typical node's memory, but it's *something* I guess?

#### Reading the Head-Gordon TD-DFT review:

* It only covers excitations
* All are gas phase
* TDA is employed throughout
  * Seems to be better for triplet states, but fails spectacularly for some singlets
* aug-cc-pvtz is the chosen basis set, though their benchmarking suggests aug-cc-pvdz for a cost trade-off for valence states and def2-tzvpd for Rydberg states "due to fortuitous error cancellation."
* Applied to the QUEST dataset which is predominantly small molecules (not fluorophores)
* Correlation is not needed for energy, but is probably important for geometry.

#### Potential research questions:

* Is there a custom combination of PCM components that can be identified with ML to build the optimal model?
* Quantifying non-electrostatic contributions to vertical transitions
* Can we generalise non-electrostatic terms from other models into our own?
  * Perhaps taking the SM dataset and re-parameterising for a different model?
  * Seems to be valid to do this with isodensity cavities, as according to the Herbet review (in the conclusion) this is seemingly the best way to get electrostatic terms that are separable from the non-electrostatic ones
  
* Is there a gold standard solvation method that can be used?
* What is the PCM specific error contribution when looking at excited states? EOM-CCSD (gas) --> TDDFT (gas) --> TDDFT (solv)

#### Issues with the research

* No high level optimised geometry. Everything is compared to TD-DFT or MP2 opt, with benchmark levels of theory for SP only. Due to the cost, everything seems to be either at relatively low levels of correlated theory, or using a dataset of really small molecules.
  * https://arxiv.org/abs/1402.3008 is a good comparison of correlated methods, ==however didn't use augmentation==.
* No correlation between high level gas phase calculations and experiment.
  * ==This is even more difficult since the methods needed to get the fluorophores into the gas phase use ionisation, and thus cannot be directly compared with the solvated species.==
* What is the scope of my studies?
  * Do I only care about fluorescence, neglecting absorbance?
    * Only singlet transitions?

  * Do I only focus on top ranked TD-DFT methods and ignore all ab initio ones?
  * Do I only focus on organic fluorophores? Metals transitions? (I guess then I'd need multireference methods)




### Short term to do:

* [ ] Gas phase calculations
* [x] ~~CMIRS SP in GAMESS~~
  * [ ] This is grossly single threaded. GAMESS will only run the whole calculation as a single thread despite only one part of the calculation being unthreaded, and because CMIRS uses an isodensity cavity, it's non analytical 
* [ ] Can use Lippert-Mataga equation to estimate Stokes shifts? (pg 39 Herbert review)
* [ ] Add Toby's suggestions to my dataset:
  * [x] Napthalamides - "nta-dmnld"
  * [ ] Alexa Fluor 532
  * [ ] Cyanine 5
  * [ ] Fluorines



## Important (play) coding:

* [x] Write a server-side script for reading files? (should be faster than catting over ssh)
  * [x] Potentially explore sftp file reads instead of ssh catting
* [x] QM/MM in Q-Chem
* [ ] Can the isodensity be used to generate a cavity made of atom-centered spheres for backwards compatibility?
* [ ] ~~QM solvation shell + EFP for long range~~
  * [ ] I've decided that this is ultimately a bad idea, as it defeats the purpose of the non configuration-specific nature of PCM. Perhaps EFP fragments within a PCM region? that could be kinda cool! LEt's Do that!
  * [ ] QM Solute + EFP for local effects + PCM


## To do:

Apart from all the papers that need reading...

* [x] Finish the Benedetta Mennucci review
* [ ] Finish the non-Benedetta Mennucci review
* [ ] Read up on domain decomposition solvation (ddPCM/ddCOSMO)
* [x] Read up on [COSMO-RS](https://wires.onlinelibrary.wiley.com/doi/10.1002/wcms.56)
  * [x] ~~Should we get a license? Perhaps not, since this would be effectively paywall restricted science...~~
    * Yeah, not worth it. Katya agrees.

* [ ] Watch Lectures
  * [ ] [Understanding strongly correlated systems in excited state chemistry](https://www.youtube.com/watch?v=Y2nNag-70w4)
  * [ ] [Benchmarking multiconfigurational methods for vertical excitation energies](https://www.youtube.com/watch?v=rlicz_ISDbU)
  * [ ] [Concepts of Molecular Excited State Calculations](https://winterschool.cc/2016/concepts-of-molecular-excited-states-calculations)
  * [ ] [Modelling Photoabsorption and Photoelectron Vibronic Band Shapes](https://winterschool.cc/webinars-2022/modelling-photoabsorption-and-photoelectron-vibronic-band-shapes)
  * [ ] [Intro to CASSCF Calculations](https://winterschool.cc/2016/intro-to-casscf-calculations)

* [ ] Read program's manual's solvation sections and pull out key discussed papers
  * [ ] ORCA
  * [ ] Q-Chem
  * [ ] PCMSolver (read the paper)