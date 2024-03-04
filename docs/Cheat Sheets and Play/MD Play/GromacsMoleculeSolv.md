# Gromacs Single Molecule Sovation (CGenFF)

## Generating your molecule force fields

First, you'll need to get your geometry in a mol2 format. build/download and convert as needed

you will need to change the molecule identifier on the second line of the files t a short (less that 5 character I think - 3 to be safe) name that you'll use later

```
@<TRIPOS>MOLECULE
MOL
 26 26 0 0 0
```

If you've built the geometry, you may need to reorder the bonds in ascending order. this can be accomplished with the perl script [`sort_mol2_bonds.pl`](http://www.mdtutorials.com/gmx/complex/Files/sort_mol2_bonds.pl)

```bash
sort_mol2_bonds.pl molecule.mol2 molecule-out.mol2
```

Now you'll need to upload the molecule to the [CGenFF server](https://www.paramchem.org/initguess/) to assign each atom an appropriate type from the CGenFF force field. Download the .str file and use the the [`cgenff_charm2gmx`](http://mackerell.umaryland.edu/charmm_ff.shtml#gromacs) script to convert your str 

!!! note
	you'll need to run the script thorugh dos2unix and change the #! line to '#! python'
	since the file needs to be run with a specific version of networkx, you should use the following process to create a conda env for the script.
	```bash
	conda create -n cgenff
	conda activate cgenff
	conda install numpy
	conda install pip
	pip install networkx==2.3
	conda install numpy
	```

You'll also need a copy of the force field iself, probably [charmm36-jul2017.ff](http://mackerell.umaryland.edu/charmm_ff.shtml#gromacs) to be able to work with the script. And now you can run the script, paying attention to the molecule identifier you used in the mol2 file:

```bash
cgenff_charmm2gmx_py3_nx2.py MOL molecule.mol2 molecule.str charmm36-jul2017.ff
```

This should spit out a file called mol_ini.pdb`, check to make sure it looks alright in pymol before going about the Gromax setup.

## Setting up in Gromax

This will primarily follow the [Gromax Lysozyme tutorial](http://www.mdtutorials.com/gmx/lysozyme/), but with a few minor differences.

### Topology

When generating your topology, don't use `pdb2gmx`, as your force field has alrady been assigned by `cgenff_charm2gmx`. instead just convert the geometry straight into a .gro file. Also take this opportunity to rename the `mol.top` file to `topol.top` as per Gromacs convention.

```bash
gmx editconf -f mol_ini.pdb -o mol.gro
```

### Solvation

Now you an create your PBC conditions and solvate the molecule. this buffers the molecule with 1nm of solvent on each side, inside of a cubic box and solvates with water

```bash
gmx editconf -f mol.gro -o molbox.gro -bt cubic -d 1
gmx solvate -cp mol-box.gro -cs spc216.gro -p topol.top -o mol-solv.gro
```

If you need to add ions, you can do so as per [the tutorial](http://www.mdtutorials.com/gmx/lysozyme/04_ions.html).

### Minimisation

Download this [`em.mdp` file](http://www.mdtutorials.com/gmx/lysozyme/Files/minim.mdp) and prepare it in gromacs as so:

```bash
gmx grompp -f minim.mdp -c mol-solv.gro -p topol.top -o em.tpr
```

If it won't work because of warning,s you can just increase the allowable with `-maxwarn 5`

Now run the  minimisation

```bash
gmx mdrun -v -deffnm em
```

Once finished, you can check the output by generating an energy plot:

```bash
gmx energy -f em.edr -o potential.xvg
```

Then type the number corrsponding to "Potential" followed by " 0"

You can open this in gnuplot as such:

```bash
gnuplot
set datafile commentschars "#@&"
plot "energy.xvg" using 1:2 with lines
```



### Equilibriation

Now to equilibriate temperature, you'll need to download this [`nvt.mdp` file](http://www.mdtutorials.com/gmx/lysozyme/Files/nvt.mdp) and modify the `tc-groups` line from:

```
tc-grps                 = Protein Non-Protein   ; two coupling groups - more accurate
```

to:

``` 
tc-grps                 = MOL SOL               ; two coupling groups - more accurate
```

Prepare the file as with the minimisation, run it with mdrun and output your temperature plot to ensure it's equilbriated:

```bash
gmx grompp -f nvt.mdp -c em.gro -r em.gro -p topol.top -o nvt.tpr -maxwarn 4
gmx mdrun -v -deffnm nvt
gmx energy -f nvt.edr -o temperature.xvg
> <Temperature> 0
gnuplot
> set datafile commentschars "#@&"
> plot "tempreature.xvg" using 1:2 with lines
```

now you need to do the same for pressure with this [`npt.mdp` file](http://www.mdtutorials.com/gmx/lysozyme/Files/npt.mdp) (including editing the `tc-grps`)

```bash
gmx grompp -f npt.mdp -c nvt.gro -r nvt.gro -t nvt.cpt -p topol.top -o npt.tpr -maxwarn 4
gmx mdrun -v -deffnm nvt
gmx energy -f nvt.edr -o pressure.xvg
> <Pressure> 0
gnuplot
> set datafile commentschars "#@&"
> plot "pressure.xvg" using 1:2 with lines
```

### MD Run

Now it's time for the MD run, following the process above with this [md.mdp file](http://www.mdtutorials.com/gmx/lysozyme/Files/md.mdp) (editing the `tc-grps`)

```bash
gmx grompp -f md.mdp -c npt.gro -t npt.cpt -p topol.top -o md_0_1.tpr
gmx mdrun -nb gpu -pme cpu -v -deffnm md_0_1
gmx energy -f nvt.edr -o pressure.xvg
```

The `-nb gpu -pme cpu` are to better utilise gpu and multicore systems

To center the molecule in the middle of the PBC cell after the run:

```bash
gmx trjconv -s md_0_1.tpr -f md_0_1.xtc -o md_0_1_noPBC.xtc -pbc mol -center
```

