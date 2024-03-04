# GAMESS

This is mostly going to be a dump of some input types as base examples. There are others on the internet.

## EFP

### Generation

```fortran
 $contrl units=angs local=boys runtyp=makefp coord=cart icut=11
  ICHARG=1 MULT=1 $end
 $system mwords=8000 $end
 $scf dirscf=.t. soscf=.f. diis=.t. $end
 $basis gbasis=n311 ngauss=6 npfunc=2 ndfunc=3 nffunc=1
  diffs=.t. diffsp=.t. $end
 $local maxloc=2000 $end
 $makefp frag=c4mpyr $end
 $data
  c4mpyr
c1
	    N 7.0   -0.5693307375  -0.7511716433  -0.8632986717
	    C 6.0    0.8052206568  -0.8927103621  -1.4601140350
	    C 6.0   -1.1058657708   0.5336124242  -1.4360946262
	    ...
	    H 1.0 29.80069   31.99390   31.95162
      H 1.0 27.57772   31.31398   32.87876
 $end
```

### Usage

```Fortran
 $SYSTEM MWORDS=4000 MEMDDI=0 $END
 $CONTRL SCFTYP=RHF RUNTYP=ENERGY MAXIT=100 ISPHER=1 
  DFTTYP=M06-2X QMTTOL=5.0E-6 $END
 $SCF DIRSCF=.TRUE. FDIFF=.FALSE. DIIS=.TRUE. DAMP=.TRUE.
  SHIFT=.TRUE. $END
 $BASIS GBASIS=N31 NGAUSS=6 NDFUNC=1 DIFFSP=.TRUE. $END
 $DFT NRAD=99 NLEB=590 $END
 $DATA
OPT
C1
H 1.0 25.90439   27.84822   23.24570
C 6.0 26.47051   27.90215   24.16385
...
H 1.0 29.80069   31.99390   31.95162
H 1.0 27.57772   31.31398   32.87876
 $END
 $EFRAG
 POSITION=FIXED
fragname=C4MPYR
A01N 31.653600   26.758130   33.903150
A04C 29.824920   25.169710   34.059840
A27C 34.844940   30.832950   33.228910
fragname=C4MPYR
A01N 24.343380   26.585780   28.336450
A04C 24.522630   24.326930   28.996910
A27C 22.280410   29.478840   31.294270
 $END
 
$MSO4    
EFP DATA FOR MSO4     SCFTYP=RHF     ... GENERATED WITH BASIS SET=XXX
 COORDINATES (BOHR)
...
STOP
 $END

 $C4MPYR  
EFP DATA FOR C4MPYR   SCFTYP=RHF     ... GENERATED WITH BASIS SET=XXX
 COORDINATES (BOHR)
...
STOP
 $END
```

