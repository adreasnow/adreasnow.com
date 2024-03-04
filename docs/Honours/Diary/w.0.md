#  Week 0 - Intro

And so it begins...

## Saturday 13/2 (recap)

This week has been a bit of a mess emotionally for me, but I'm slowly getting through. Induction has been done, I have  swipe card access and office space, I'm slowly figuring out my project in more detail, I'm  getting a better understanding of the project.

I've made this fancy PERT diagram so far (still a WIP), but it's feeling a  bit more tangible. Timing and critical path is still to be worked out, and some of the connections probably aren't correct.

<iframe frameborder="0" style="width:100%;height:650px;" src="https://viewer.diagrams.net/?highlight=000000&edit=_blank&layers=1&nav=1&title=PERT.drawio#Uhttps%3A%2F%2Fdrive.google.com%2Fuc%3Fid%3D1gZoQR6Bp1Xqm1Cz9pkHgXgTGTrmY1viu%26export%3Ddownload"></iframe>

I'll probably have to make a whole new one for the fftool process tbh, it's quite an intricate a method.

### Lockdown

5 day lockdown has started in Victoria... I can only hope that we can be back in the office on Thursday.

## Sunday 14/2

I've spent a bit of time today just working on getting my project flow (GANTT and PERT) down pat, but I'm sure it will change as I start to dig in to the literature and explore what I need to explore.

## Wednesday 17/2

Yesterday I had a meeting wit Katya which consolidated some of my ideas but left me with a few question that I still don't quite get.

In talking with Michael, I feel as though the MD approach that we're taking might not be the best, but I think I need to find some literature looking at how other people have tackled the issue of barrier heights (with bond cleavages/formations) in MD. Michael's suggestion is to move all the pFF parameters from LAMMPS to NAMD so that I can easily use ORCA for QM/MM instead of trying to do the whole thing with pMD. 

This definitely feels like it's going to be a crazy complicated year though...

I've mostly been trying to get started on reading, and have made it 13 pages in to Katya's 2017 review[^1]. It's quite dense though and I'm going to have to take breaks and do a few things at once to keep my brain happy.

[^1]: Izgorodina, E. I.; Seeger, Z. L.; Scarborough, D. L. A.; Tan, S. Y. S. Quantum Chemical Methods for the Prediction of Energetic, Physical, and Spectroscopic Properties of Ionic Liquids. *Chem. Rev.* **2017**, *117* (10), 6696–6754. https://doi.org/10.1021/acs.chemrev.6b00528.

For ILs, Katya seems happy enough to use \[c2mim\]\[OAc\] for one species (aprotic) , but the other might be more tricky. there definitely seems to be a push to use $\ce{DHP-}$ ($\ce{H2PO4-}$)  for the anion, but the cation is proving more difficult, as the common go-to for a $4^\circ$ amine seems to be choline, ($\ce{Me3NEtOH+}$) but it has a melting point of $\ce{190^\circ C}$, so we'd need to add water, which is not favourable.

We could really use any $4^\circ$ amine for this, though we also need to be able to find physical properties (density mostly) to be able to benchmark out pMD system against, which means finding an IL that's commercially available.

Potential ILs

| IL                   | $T_m\:(^\circ C)$ | $\rho\:(g\cdot cm^{-3})$ |    $\eta\:(cP)$     |
| :------------------- | ----------------- | :----------------------: | :-----------------: |
| $\ce{[NH3Et][HSO4]}$ | 33.5              |          1.438           |         128         |
| $\ce{[c2mim][OAc]}$  | -45               |          1.101           |         93          |
| $\ce{[c2mim][DHP]}$  | <RT               |   1.36 ($28^\circ C$)    | 1510 ($25^\circ C$) |

!!! note "New Issue"
	So I just realised that we need to be really careful with using ammonia based ILs, as any deprotonated species will likely act as a Michael donor

### (Important) papers from today:

#### Synthesis of aminochalcone and aza-Michael addition

Successful cyclisation without Fe, using just conc. $\ce{HCl}$ or 1:1 $\ce{AOcH:H3PO4}$ @ $120^\circ C$

> "Following reduction of the nitro group in 6a,two mechanistic pathways can be envisoned for the ring closure of aminochalcone 8a. Iron does not appear to play a significant role in the cyclization because 8a has been successfully cyclized to 10a using 1:1 v/v acetic acid:phosphoric acid [6] and concentrated hydrochloric acid (this study) without iron. In the first mechanistic scenario, strong acid would protonate the enone carbonyl in 8a to give 11, which would be activated toward conjugate addition by the amino group. Because the amine function in 8a is part of a vinylogous amide, it is not as basic as a typical aniline nitrogen, and thus, some of the unprotonated form should be present to add to the acti- vated enone system. Alternatively, strong acid condi- tions could also protonate the enone double bond to give the benzylic carbocation 12, which would then be attacked by the nucleophilic aniline nitrogen."

Bunce, R. A.; Nammalwar, B. (±)-2-Aryl-2,3-Dihydro-4(1H)-Quinolinones by a Tandem Reduction-Michael Addition Reaction. *J. Heterocycl. Chem.* **2011**, *48* (3), 613–619. https://doi.org/10.1002/jhet.624.

#### aza-Michael addition step

Purely base/acid catalysed

1 mmol aminochalcone in 1:1 glacial acetic:phosphoric acid for 20 mins (68% yield)

Tőkés, A. L.; Janzsó, G. Reactions of 2′-Aminochalcone. *Synth. Commun.* **1989**, *19* (18), 3159–3168. https://doi.org/10.1080/00397918908052715.

#### Highly efficient aza-Michael

Using organic bases achieved really high yields, particularly piperidine.

I assume that this is deprotonating the amine to to make it more nucleophilic.

Zheng, X.; Jiang, H.; Xie, J.; Yin, Z.; Zhang, H. Highly Efficient and Green Synthesis of Flavanones and Tetrahydroquinolones. *Synth. Commun.* **2013**, *43* (7), 1023–1029. https://doi.org/10.1080/00397911.2011.621096.

### AIMD

As it turns out, I'm the kind of idiot that thinks to themselves "maybe I'll just run a quick AIMD job to see where the proton ends up" :unamused:

## Thursday 18/2 (lockdown lifted)

