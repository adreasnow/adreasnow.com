# Week n+19/20

## Monday 8/11

### What I did today:

* I implemented Michael and India's feedback, I think that Katya wants to take a final look over this version before she comments on my thesis one last time, so I've sent it off to her to take a look
* I wrote and packaged up my PyMOL script into a nice little gui and [published it to github](https://github.com/adreasnow/honours#plugin) while I was out at Brunetti's with a friend :)

## Tuesday-Wednesday 9-10/11

### What I did today:

* I came up with an idea for my partition function from MD work. To reduce the computational cost, I could use the Psi4 `QMMM.chargefield` approach follow a procedure of:
  1. Calculate SP of the ILs
  2. Use the SP to generate partial charges of the ILs
  3. Apply the partial charges to build a chargefield
  4. Optimise the solute in the chargefield
  5. Apply DFTD3/4 corrections to the optimised geometry following the procedure of:
     * $\Delta E_{\text{dispersion}}(\text{Solute}) + \Delta E_{\text{dispersion}}(\text{interaction}) =\\ \Delta E_{\text{dispersion}}(\text{system}) - \Delta E_{\text{dispersion}}(\text{ILs})$
  6. From here it should be possible to obtain either the $\Delta G^\circ$ or $\Delta E^\circ$ using Psi4
* This would however neglect induction/exchange as well as charge transfer, but I'm currently running some SAPT0 jobs to decompose the solute/solvent interaction to see how bad this might actually be for the interaction energy.
  * This is definitely not trivial... there's 4500 basis function in this system, and I need to complete within the 7 day limit on MonARCH.

* Yes, I know that this isn't helping me prepare for my thesis defence... \

#### Writing Tasks

* [x] Review the few red points left in the thesis (it's just the intro atm)
* [x] Finish off the rest of the drafty first edit, including all of the front/tail matter
* [x] Proof read and tweak
* [x] Implement round 1 feedback suggestions
  * [x] Sophie
  * [x] Peter
  * [x] Alexandr - I'm actually going to ignore a decent chunk of his feedback tbh. His feedback is a bit contentious in places, and he was missing a large chunk of my work/polish when he reviewed it.
  * [x] Katya
* [x] Proof read and tweak
* [x] Review India's thesis
* [x] Implement round 2 feedback suggestions
  * [x] Michelle
  * [x] Michael
  * [x] India
* [x] Implement round 3 feedback suggestions
  * [x] Katya
* [ ] Submit
