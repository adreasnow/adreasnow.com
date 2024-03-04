#### Perhaps those few lines from the Turbomole documentation can help to get an overview:

* def-SV(P) for routine SCF or DFT.
	* Quality is about 6–31G*
* def-TZVP for accurate SCF or DFT.
	* Quality is slightly better than 6–311G**
* def-TZVPP for MP2 or close to basis set limit SCF or DFT
	* Comparable to 6–311G(2df)
* def-QZVP and def-QZVPP for highly correlated treatments; 
	* quadruple zeta + 3d2f1g or 4d2f1g (beyond Ne), 3p2d1f for H

#### Cc basis sets are not good for DFT, but are good for post-HF

#### Dunning - C Atom

| |Core|Valence|Polarisation|Diffuse|Equivalent|Configuration|
|---|---|---|---|---|---|:--|
|cc-pVDZ|1/AO|2/AO|1$l$ (1d)| |6-31(d)|3s2p1d|
|aug-cc-pVDZ|1/AO|2/AO|1$l$ (1d)|spd|6-31+(d)|4s3p2d|
|cc-pVTZ|1/AO|3/AO|2$l$ (2df)||6-311(2d,f)|4s3p2d1f|
|aug-cc-pVTZ|1/AO|3/AO|2$l$ (2df)|spdf|6-311+(2d,f)|5s4p3d2f|
|cc-pVQZ|1/AO|4/AO|3$l$ (3d2f1g)||6-3111(3d,2f,g)|5s4p3d2f1g|
|aug-cc-pVQZ|1/AO|4/AO|3$l$ (3d2f1g)|spdfg|6-3111+(3d,2f,g)|6s5p4d3f2g|

