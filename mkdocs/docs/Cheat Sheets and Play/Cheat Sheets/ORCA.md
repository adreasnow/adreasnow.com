## Threading and memory
#### Memory
This is listed in MB per core. Full allocation will be (maxcore $\times$ nprocs).

```
%maxcore 875
```
#### Threads specification

!!! warning
	Note that MPI will limit orca to only using the max number of physical threads unless ```--use-hwthread-cpus``` is called in the orca run command

```
%pal
   nprocs 16
end
```

## PES Scan
#### Relaxed
* Run as ```OPT```
* Note that atom numbering in the coordinate lists starts from 0, not 1.
```
%geom Scan
D 12 1 6 7 = -179.0, 179.0, 36
end
end
```

## Basis

#### Split basis

Overwrites the global basis et for Pd

```
%basis
newgto Pd "def2-TZVP" end 
end
```



## TS and IRC

Calculating the full hessian isn't always necessary but will help when the starting geometry isn't close enough to the TS. Calculating frequencies is just a good way to ensure that you have the correct TS, as you can look a the negative frequenc(y/ies) to see if they correspond to the correct trajectory.

!!! note
	If using `NumHess` be sure to also use `! NumFreq`



```
! OptTs Freq b97-3c Def2-tzvp

%geom
   Calc_Hess true
   #NumHess true # If analytical isn't available
   Recalc_Hess 5
end
```

If the OptTs job looks good, this should be pretty straightforward, however you might need to specify which frequency corresponds to the trajectory of the reaction path, in which case, consult the orca manual

```
! IRC B97-3c Def2-tzvp
```

Other things to consider are using the neb approach or `NEB-TS` to chain the NEB scan with an OptTS job

```
! NEB-CI M062X def2-tzvp def2/j CPCM(Ethanol) RIJCOSX DefGrid3

%neb
   NEB_End_XYZFile "ba2-2-p.xyz"
   Nimages 8
end

*xyzfile 1 1 ba2-2-r.xyz
```

* Specifying an alternate eigenvector to follow with `%geom TS_Mode {M 1} end end`
* Specifyng an eigenvector pertaining to a specific bonding coordinate  `%geom TS_Mode {B 26 14} end end`
* Making sure that the coordinate of the TS is included in the internal coordinates `%geom modify_internal { B 26 14 A } end end`
* Specifying for the OptTS job to only look at a TS pertaining to specific atoms 

```
%geom
	TS_Active_Atoms {26 14 27 28 30} end 
	TS_Active_Atoms_Factor 1.5 
end
```

## Solvation

#### SMD

!!! warning
	The ORCA input library doesn't document SMD properly


```
! ... CPCM

%cpcm
SMD true
SMDsolvent "Ethanol"
end
```

## Point Charges

There's two ways to do this. The first is to use the geometry input. This will include self interaction though

```
* xyz 0 1
H               23.70901    25.99001    30.68064
C               24.50698    26.53900    30.20289
C               25.79048    26.00225    30.22100
C               24.27050    27.64376    29.38992
H               25.94284    25.04627    30.69985
C               26.84531    26.72246    29.59089
Q  0.105899706  26.20272    25.51603    19.30745
Q -0.130797234  26.80556    26.66885    18.66012
Q -0.18370286   24.90133    25.4567     18.55953
*
```

Or you can use a `charges.pc` file to import a list of charges that don't include self interaction. The `charges.pc` file looks like:

```
3
0.105899706  26.20272  25.51603  19.30745
-0.130797234  26.80556  26.66885  18.66012
-0.18370286  24.90133  25.4567  18.55953
```

And the ORCA input includes

```
% pointcharges "charges.pc"
```





## Generating cubes from GBW

You can simply use the `orca_plot` program and set the output file type to a cube file to generate cubes

```bash
orca_plot S4aq-pbe-freq.gbw -i
```

### Non-Bader Charge Analysis

The easiest way to get a full suite of charge analysis tools is to use Multiwfn, but first you need to convert the .gbw into a .molden.input file. Don''t use the extension for this:

```bash
orca_2mkl S3g -molden
```

Then you can load it into Multiwfn:

```bash
multiwfn S3g.molden.input
```

And use option 7 (Population analysis and atomic charges)

!!! note
	This is more tricky for Bader charge analysis and AIM based methods. it might be a better idea to use AIMALL for those situations.

### Bader Charge Analysis

From the previous step, generate an electron density cube that you can use with the [Bader charge Analysis tool](https://web.archive.org/web/20200203180046/http://theory.cm.utexas.edu/henkelman/code/bader/). you might need ot increase the number of grid intervals to get a better desity

```
bader S4aq-pbe-freq.eldens.cube
```



## Visualising Orbitals/Wavefunctions

To output orbitals, you need to tell orca to output orbitals, then you can open it with Avogardo.

```
%output
	print[p_mos] true
end
```

Or, you can convert the output to a molden file:

```bash
orca_2mkl <basename> -molden
```

You can then open this with Molden, or even iboview

This can also be loaded into multiwfn

## Chaining Job Files

```
! Opt b97-3c cc-pvtz

* xyz 1 2
  C      7.527050   -3.874731   -1.640372
*

$new_job

! Freq HF cc-pvtz

* xyzfile 1 2 S1aq.xyz #loads in the previous job's geometry
```

## Things to Try if Jobs are Troublesome

More things in the [orca input library](https://sites.google.com/site/orcainputlibrary/scf-convergence-issues) for SCF

#### Maximum Number of SCF Iterations


```
%scf
   MaxIter 500
end
```


#### levelshifting Intensity and Duration

The `ErrOff` can be pushed really small if things are stagnating (0.000001)

```
%scf
   Shift Shift 0.1 ErrOff 0.1 end
end
```

#### Full Hessian (works amazingly for OptTS)

 Once every 10 steps is probably frequent enough for a ground state opt job

```
%geom
   Calc_Hess true
   Recalc_Hess 5
end
```

#### DIIS Reset Frequency (how often to calculate the Fock matrix)

```
%scf
   directresetfreq 5 # default 15
end
```

#### DIIS Number of Fock Matrices to Remember

```
%scf
   DIISMaxEq 30 # default 5
end
```

#### Convergence Criteria

Can also go up to `verytight`

```
! tightopt tightscf
```

#### Grid Density

3 is the default, though Minnesota functionals need at least 5

```
! grid5
```

#### Full NR Step (I think this is just a full Hessian at every step instead of DIIS)

```
! NRSCF
```

#### SOSCF start

Defaults is 0.0033

```
%scf
   SOSCFStart 0.00033
end
```

You can also disable SOSCF with

```
! NOSOSCF
```

### Damping

Can be pushed to `VerySlow`

```
! SlowConv
```

#### Guess

Options include  `PAtom`, `Hueckel` and `HCore`, as well as the default `PModel`

```
%scf
   guess PAtom
end
```

