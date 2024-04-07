# LAMMPS/LigParGen/fftool

## Requirements

* To convert LigParGen output to the `.ff` needed for fftool -  [ILMD](https://github.com/mccg-pas/group-wiki/tree/master/Scripts/ILMD) by [arcaian](https://github.com/arcaian). That man is so helpful
* To generate the PACKMOL and LAMMPS inputs - [fftool](https://github.com/agiliopadua/fftool)
* To build the gemetry - [PACKMOL](http://m3g.iqm.unicamp.br/packmol/home.shtml)

## Process

### Generating the XYZ and FF

Start by heading to [LigParGen](http://zarbi.chem.yale.edu/ligpargen) and building your molecule or inputting in the SMILES string and generating the needed files.

From here, you'll need to save the GROMACS `.top` file and the LAMMPS `.lmp` file



Now you'll need [ILMD](https://github.com/mccg-pas/group-wiki/tree/master/Scripts/ILMD) and can generate the `.ff` file as such:

```bash
convertLigParGen.py -g gromacs.top -l lammps.lmp -o molecule.ff
```

### Generating the LAMMPS Input

You want to follow the instructions over at [fftool on github](https://github.com/agiliopadua/fftool), but the basic process is as follows

1. Generate the PACKMOL script from the pdb file(s) you've just generated. The force field will be read form the PBD file.
   * `fftool 100 molecule.xyz -b 10`
2. Modify the `pack.inp` to build your geometry how you want it, using the files specified in the file. Examples are available at the [packmol website](http://m3g.iqm.unicamp.br/packmol/examples.shtml)
3. Run PACKMOL to generate the box
   * `packmol < pack.inp`
4. Run the fftool line again, but specify the MD package to generate your scripts (`-l` for LAMMPS)
   * `fftool 100 molecule.pdb -b 10 -l`
5. Modfy the in.lmp and you're ready to run! you should only need the `in.lmp` and `data.lmp` files to run LAMMPS
   * `mpirun -np 4 lmp -pk gpu 1 -sf gpu -in in.lmp`