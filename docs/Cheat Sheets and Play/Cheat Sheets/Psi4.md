!!! warn
	Psi4 has really fantastic documentation and a rather swift development cycle, so I tend to go straight to the Psi4 documentation to find what I need. There are a fair few gems hidden within the python bindings though that aren't well documented (or aren't even mentioned), so those are tricky and I'll do my best to write about them here.

## Threading and Memory

```python
memory 14 GB
set_num_threads(16)
```
## Scratch

If you're going to be changing the scratch from within the script, you'll need to use the `psi4_io` utility

```python
psi4_io = psi4.core.IOManager.shared_object()
psi4_io.set_default_path(''~/Scratch')
```

## Basis

#### Hybrid Basis
* `DZ` would be applied to all atoms
* `3-21G` would be applied to all carbon atoms
* `sto-3g` would be applied to only H1 and C1

```python
basis {
   assign DZ
   assign C 3-21G
   assign H1 sto-3g
   assign C1 sto-3g
}
```

## DFT

Increase the DFT grid density for more accurate calculations ([list of grids here](https://psicode.org/psi4manual/master/dft.html#grid-selection)):

```python
set {
    dft_spherical_points 590 # equivalent to Grid6 in ORCA
    dft_radial_points 99
    scf_type df # always use DF for DFT?
}
```



## SCF

* `maxiter` changes the number of SCF iterations
* `guess sad` is the default and is good though if this doesn’t work, try `huckel` instead
* `reference` specifies UHF, RHF or ROHF
* `scf_type direct` is a solid algorithm, though `pk` and `df`  are also good



```python
set {
  guess sad
  reference uhf
  scf_type direct     # default is df
  maxiter 200         # default is 100
}
```

### For hard to converge systems - OPTIONS

#### You can use a second order SCF calculation

```python
sef {
  soscf true
}
```

If it’s kicking in too early, then increase the point at which it kicks in. I’t’s probably a good idea to only really kick it off when the iterations start to be less useful

```python
sef {
  soscf true
  soscf_start_convergence 1.0e-6
}
```

You can try increasing the number of micro steps if you’re not getting much benefit. To see if they’re converging, set `soscf_print true` ~~and how tightly they need to converge~~ I don’t think it’s really needed to increase this, as it’s far more likely that it’s not being reached.

```python
sef {
  soscf_conv      5.0e-5 # default is 5.0e-3
  soscf_max_iter  10     # default is 5, you can set this crazy high though (lik3 30)
  soscf_print     true
}
```
For the best practice (taken from ORCA), it seems that you want to delay the start of soscf and make sure that the iterations converge, as such:

```python
set {
  soscf true
  soscf_start_convergence 1.0e-5 # default is 1.0e-3
  # soscf_conv      5.0e-5 # default is 5.0e-3
  soscf_max_iter  1000
  soscf_print     true
}
```

#### QC

Enables the QC algorithm used by gaussian

```python
sef scf {
  qchf true
}
```

#### MOM

In some cases with oscillating SCF it may be worth using MOM, the trick however is to ONLY switch it on when needed, not before. It can do some really bad things to the energy if switched on too early.

```python
set scf {
  mom_start 20 # Switches on that the 20th SCF iteration
}
```

!!! info
	I would strongly suggest looking over the [ERI algorithms](https://psicode.org/psi4manual/master/scf.html#eri-algorithms), [guess methods](https://psicode.org/psi4manual/master/scf.html#initial-guess) and [SOSCF](https://psicode.org/psi4manual/master/scf.html#second-order-convergence) sections of the Psi4 documentation for more appropriate and up-to-date methods for getting the most from Psi4. These tend to change pretty quickly from version to version, and the [SCF documentation](https://psicode.org/psi4manual/master/scf.html is very robust, so I will defer to the Psi4 guys. 

## MCSCF

The inputs for MCSFF are based on the symmetry of the orbitals, so in this example of water, the restricted doubly occupied orbitals (`docc`) are 1xA1, 0xA2, 0xB1 and 0xB2. Where symmetry is all the same, a single item could be used in the list instead.

The lists provided are

* `restricted_docc`/`restricted_uocc`
* `frozen_docc`/`frozen_uocc`
* `active`

```python
set {
    basis           6-31G**
    restricted_docc [1, 0, 0, 0]
    active          [3, 0, 1, 2]
    nat_orbs				True
}
energy('casscf')
```

### `set detci`

To swap out (rotate) orbitals from our different spaces, we can use the `detci` option `mcscf_rotate`. We append a list for each swap, with the values:

* Irrep (symmetry)
* Orbital 1
* Orbital 2
* `90` - this switches them over

```python
set detci {
  mcscf_rotate		[[0, 16, 18, 90]]
}
```

We could also choose a specific root to follow with

```python
follow_root				1 #for the first excited state
```

or specify how many roots to calculate

```python
num_roots					5
```

You would typically call an casscf job using a reference wavefunction, but if not, you can specify the guess type

```python
energy('casscf' ref_wfn=wfn) #specify the reference wavefunction directly

set detci {
  mcscf_guess		mp2 #specify mp2 natural orbitals as the guess (mp2 only for DF-RHF) 
}

energy('casscf') 
```



## Generating Cubefiles

Requires the calculation of energy, saved to a wavefunction.

The orbitals are specified as $+ve$ for $\alpha$ cubes and $-ve$ for $\beta$ cubes

```python
set globals {
  cubeprop_tasks ['orbitals']
	cubeprop_orbitals [5,6,-5,-6]
}

E, wfn = energy('scf', return_wfn=True)
cubeprop(wfn)
```

These can be read in and visualised with [Py3Dmol](../Python/Psi4Interactive/#viewing-psi4-molecules-with-cubes-py3dmol)

## Generating FCHK Files

If you return the wfn object, you can run it thorugh the `fchk_writer` function to spit out an fchk file

```
energy, wfn = energy('scf', return_wfn=True)
fchk(wfn, 'output.fchk')
```

## ESP

For viewing in Avogadro(1), or GaussView generate an fchk as above

For python interpretation or PyMol:

```Python
optimize()
...


set{
  cubeprop_tasks ['ESP', 'DENSITY']
}

energy, wfn = energy('scf', return_wfn=True)

cubeprop(wfn)
fchk(wfn, 'output.fchk')
```

Load the `Dt.cube`, `ESP.cube` and `geom.xyz` into PyMol and copy and paste the code from [here](../Pymol/#generate-esp-from-psi4-cubes)

The ESP can also be calculated at specific points:

```python
mat = np.array([[0, 0, 0],
                [0, 0, 1]])
psi4mat = psi4.core.Matrix.from_array(mat)
myesp = psi4.core.ESPPropCalc(wfn)
charges = myesp.compute_esp_over_grid_in_memory(psi4mat)
```

!!! info
	For an more finessed implementation, see my [miniFMO-ESP implementation](https://github.com/adreasnow/comp-chem-scripts/blob/master/compoundScripts/miniFMO/miniFMO2-ESP.py)

## Molecular Property Analysis

```python
E, wfn = energy('hf',  properties=['MULLIKEN_CHARGES', 'LOWDIN_CHARGES'], return_wfn=True)
oeprop(wfn, 'MULLIKEN_CHARGES', 'LOWDIN_CHARGES')

# these charges can be accessed through the wfn object directly
for i in range(wfn.molecule().natom()):
	charge = wfn.atomic_point_charges().np[i]
```

!!! info
	For an example of evaluating properties on a grid in parallel see [this function](https://github.com/adreasnow/comp-chem-scripts/blob/ef3b73da0c1a21f3f30ca34a1201a966c14a7a86/compoundScripts/fieldGen/fieldGen.py#L66) and [how it's utilised](https://github.com/adreasnow/comp-chem-scripts/blob/ef3b73da0c1a21f3f30ca34a1201a966c14a7a86/compoundScripts/fieldGen/fieldGen.py#L73), as well as the [ESP](#esp) section

## Point Charges

!!! warning
	I've not explored this yes, but as of Psi4 1.6:<br/>
	"External charges locations now always specified in Bohr, rather than units of molecule. Also, creation of QMMM object is discouraged. Instead, pass charges and locations through `external_potentials` keyword argument." Check the documentation for syntax, as it *is* different!

You can specify point charges by making an `psi4.QMMM.externalPotential` object and applying to your job as such:

```python
chrgfield = psi4.QMMM() # create the chargefield
chrgfield.addChargeAngstrom(-1, 0, 0, 0) # add some charges
chrgfield.addChargeAngstrom(1, 1, 0, 0)
chrgfield.populateExtern() # build the chargefield's extern object
psi4.core.set_global_option_python('EXTERN', chrgfield.extern) # add the extern object to the calculation
```

This allows the `QMMM` object to be created, edited and replaced on the fly, without having to edit the gheometry, as you might in ORCA or gaussian.

!!! warning
	Be aware of geometry units. If obtaining point charges from atoms as in [Molecular Property Analysis](molecular-property-analysis), the units spat out by the `molecule.x`, `molecule.y` and `molecule.z` variables will be in Bohr, not angstrom, so it might be more convenient to use  `.addChargeBohr()`

!!! info
	For an more finessed implementation, see my [miniFMO implementation](https://github.com/adreasnow/comp-chem-scripts/blob/master/compoundScripts/miniFMO/miniFMO2-PC.py)



## Wavefunction Saving

You can save and load wavefunction objects to numpy arrays using the inbuilt function as such:

```python
# save wavefunction
wfn.to_file('wfn')

# load wavefunction
wfn = psi4.core.Wavefunction.from_file("wfn.npy")
```

## Solvation

!!! warning
	While Psi4 v1.6 has significantly improved the performance of this module with parallelisation and integral screening, there are still no analytical gradients, which makes PCM effectively unusable for optimisations or freqs.

* Available models are:
  * CPCM
  * IEFPCM
* Solvents and keywords are documented in the [PCMSolver documentation](https://pcmsolver.readthedocs.io/en/latest/users/input.html#medium-section-keywords)
* For viewing the cavities generated, you can use https://3dviewer.net to view the `cavity.off__####` file. This should allow you to tweak the cavity area value to reduce the number of points that PCMSolver has to compute. Just make sure to rename the file extention to be `.off`

```python
set {
  pcm true
  pcm_scf_type total
}

pcm = {
   Units = Angstrom
   Medium {
   SolverType = CPCM
   Solvent = Ethanol
   }

   Cavity {
   RadiiSet = UFF
   Type = GePol
   Scaling = False
   Area = 0.3
   Mode = Implicit
   }
}
```



When using Psi4 as a module you need to use the `psi4.pcm_helper()`` function to parse the PCMSolver options as such:

```python
pcm = """Units = Angstrom
   Medium {
   SolverType = CPCM
   Solvent = Ethanol
   }

   Cavity {
   RadiiSet = UFF
   Type = GePol
   Scaling = False
   Area = 1.0
   Mode = Implicit
   }
"""
psi4.pcm_helper(pcm)

```

## Geometry Opt

For more optimisation iterations

```python
set globals {
  geom_maxiter		500
}
```

You can print out a trajectory file as follows:

```python
set optking {
print_trajectory_xyz_file   True
}
```

### Errors

Backtransofrmation or torsion issues in general, just optimise in cartesian space, though this may make the optimisation process slower:

```python
set optking {
   opt_coordinates cartesian
}
```

you could try forcing multiple backtransformation attempts, however this doesn’t always work

`Could not converge backtransformation`

```python
set optking {
  ensure_bt_convergence true
}
```

If you wanted to keep optimising with internal coordinates, you can use the following to try and clean up the geometry.

```python
molecule eal{
0 1
   C          1.75400        0.01500       -0.00100
...
}

eal.update_geometry()
eal.symmetrize(0.05)
```

If the geometry just isn;t converging, you could try modifying the dynamic level as such

```pyhton
set {
  dynamic_level = 2 
}
```

This corresponds to the levels below (taken from the psi4 source):

```c
/*  if dynamic mode is on, then other settings are overridden.
* step_type = step
* intrafragment_step_limit = step_limit
* consecutive_backsteps = backsteps
* RI = redundant internals; D = default anyway
*dynamic  step   coord   step_limit      backsteps              criteria
* level                                               for downmove    for upmove
*  0      RFO    RI      dynamic         no           none            none
*
*  1      RFO    RI      dynamic(D)      no           1 bad step
*
*  2      RFO    RI      small initial   yes (1)      1 bad step
*                        dynamic(D)
*
*  3      SD     RI      large(D)        yes (1)      1 bad step
*
*  4      SD     RI+XYZ  large(D)        yes (1)      1 bad step
*
*  5      SD     XYZ     large(D)        yes (1)      1 bad step
*
*  6      SD     XYZ     small           yes (1)      1 bad step
*
*  7  abort
*
*  BackStep:
*   DE > 0 in minimization
*
*  BadStep:
*   DE > 0 and backsteps exceeded and iterations > 5  ** OR **
*   badly defined internal coordinate or derivative
*
* */
```



`PSIO Error`

Scratch directory couldn't be written to

### ADCC Errors

In getting the adcc module to work with Psi4 1.5 I ran into a couple of issues that are easiy enough to fix:

The first happens as a result of a conda consistency issue and can be fixed by running `conda install 'h5py<3.2'`

```python
packages/h5py/defs.cpython-39-darwin.so, 0x0002): Symbol not found: _H5Pget_fapl_ros3
```

This one is a bit more annoying and happens because InvalidReference is actually in `adcc.backends.psi4`

```python
cannot import name 'InvalidReference' from 'adcc.backends'
```

We can fix it by modifying line 3491 of `lib/python3.9/site-packages/psi4/driver/procrouting/proc.py` to read `from adcc.backends.psi4 import InvalidReference`

## PES Scanning Example

It is possible to scan through a geometry by looping thorugh a list of custom geometries as shown in the example below.

You could also treat all of your geometry as variables and manipulate it incramentally in some way

This will scan through a range of geometries where $R=2.0\unicode{x212B} \to R=7.0\unicode{x212B}$ in steps of $0.1\unicode{x212B}$

```python
memory 35 GB
set_num_threads(16)
basis {
   assign aug-cc-pvtz
   assign Pd pd-def2ecp
}

molecule mol1{
0 1
 C                  0.00000000    0.00000000    0.60270000
 C                  0.00000000    0.00000000   -0.60270000
 H                  0.00000000    0.00000000   -1.66110000
 H                  0.00000000    0.00000000    1.66110000
--
2 1
 Pd                 R             0.00000000    0.00000000
}

Rvals = []
for i in range(20, 70):
   Rvals = Rvals + [ float("%.1f" % (i * 0.1))]

set scf {
  maxiter 500
  soscf true
}

ecp = {}

for R in Rvals:
   mol1.R = R
   ecp[R] = energy('SAPT2')
psi4.print_out("-------------------  SCAN REULTS  ---------------------\n")
psi4.print_out("\n")
psi4.print_out("        R [Distance]         E_int [kj/mol]         \n")
psi4.print_out("-----------------------------------------------------\n")
for R in Rvals:
   e = ecp[R] * psi_hartree2kjmol
   psi4.print_out("        %3.1f            %10.6f\n" % (R, e))
```