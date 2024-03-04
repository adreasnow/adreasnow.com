## Generate Surface From Cube

!!! warning "Pre-Disclaimer"
	Most of my work with PyMol is actually stored in my [PyMOL scripts on github](https://github.com/adreasnow/PyMOLScripts), so this is ultimately unmaintained

Use cubegen or [Psi4](#generate-esp-from-psi4-cubes) to make a cubefile

isomesh <name of surface\>, <name of cube\>, <density level\>
``` python
isomesh keppra-opt-gas-homo2, keppra-opt-gas-homo, -0.02
```



To get nice surfaces and colour them, iterate this script for each of the cubes you input:

```python
isosurface pyrrole-BF4-32-surf, pyrrole-BF4-32, -0.02
color tv_green, pyrrole-BF4-32-surf
set surface_negative_color, tv_red
set surface_negative_visible

```



## Generate ESP From [Psi4 Cubes](../psi4/#generating-cubefiles)

After loading in Dt.cube, ESP.cube and your geom.xyz

```python
preset.simple(selection='all')
color grey40
color atomic, (not elem C)
isosurface Dt2, Dt, 0.001
ramp_new espcol, ESP, [-.05,-.025,0,.025,.05], [red,orange, yellow,green, blue]
set surface_color, espcol, Dt2
set transparency, 0.3
```



## Set to Simple and Colour by Element

```python
preset.simple(selection='all')
color grey40
color atomic, (not elem C)
```

## Set to Ball and Stick and Colour by Element

```python
preset.ball_and_stick(selection='all', mode=1)
color grey40
color atomic, (not elem C)
```

## A Full Copy/Paste Script

A full copy and paste block open everything, generate the ESP and ramps, render the image and delete everyhting might look like this:

```python
cd /data/Computation/Scratch/psi4-esp/benzene
load Dt.cube
load ESP.cube
load geom.xyz
preset.simple(selection='all')
color grey40
color atomic, (not elem C)
isosurface Dt2, Dt, 0.001
ramp_new espcol, ESP, [-.04,-.02,0,.02,.04], [red,orange, yellow,green, blue]
set surface_color, espcol, Dt2
set transparency, 0.3
disable espcol
png benzene.png, width=1000px, dpi=300, ray=1
delete Dt
delete Dt2
delete ESP
delete geom
delete espcol

```

