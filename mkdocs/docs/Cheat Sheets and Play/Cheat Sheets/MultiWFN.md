## Electron Density Difference - Contour Plot

![!](http://sobereva.com/multiwfn/gallery/12.png){: style="width: 40%; "class="center"}

Load in the fchk file (if using psi4, be sure to generate the wfn for this with `reference UHF`, as MultiWFN requires $\alpha$ and $\beta$ orbitals)

1. 4 - Plot plane map
2. 2 - Tell Multiwfn you want to draw deformation map

3. Specify your level of theory for calculating the electron density. ENTER for B3LYP/6-31G*

4. 1 -  Electron density function

5. 2  To generate a contour map

6. Specify your resolution. Press ENTER for 200x200

7. Choose how you'd like to align the plane the contour should be measured across.

## AIM - Calculating basin volume (for polarisibility)

AIM - Calculating basin volume

1. generate `.wfn` with `orca_2aim baename`
2. load in `.wfn` with `multiwfn basename.wfn`
3. 17 - Basin analysis
4. 1 - Generate basins and locate attractors
5. 1 - Electron density
6. 2 - Medium quality grid
7. 7 - Integrate real space functions in AIM basins with mixed type of grids
8. 2 - Integrate a specific function with atomic-center + uniform grids, but with exact refinement of basin boundary
9. 1 - Electron density
