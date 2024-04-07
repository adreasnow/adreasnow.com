# Week 3

## Monday 14/3

### Project

I mostly spent my day trying to figure out a combination of RI approximations, (aux) basis sets, and gradient methods that would work for my systems. what I ended up going with was:

```
! opt freq wB97X-D3 def2-qzvpp def2/j CPCM grid6 tightscf RIJONX
```

I did try to use `aug-cc-pvtz autoaux`, but the calculations kept crashing, as did RIJCOSX. RIJK isn't available for double hybrids and can't do analytical hessians.

### Modules

I did manage to get a little bit of metallosupramolecular chem notes written...

## Monday 15/3

### Project

Things are moving pretty slowly. I've had to re-queue all the jobs that I lined up yesterday, as they're (unsurprisingly) timing out. I'm also trying to do a TS search for the Lewis base pathway, but it's proving incredibly difficult. I might re-try NEB for the hundredth time...

### Modules

I've decided that since green chem is open book and organic is take home, I'm not going to write notes for them. I'll re-watch the lectures but notes are just going to be too time consuming.

## Thursday 18/3

### Project

I'm putting the project on the backburner for a bit. I'm still trying to churn out some benchmark data for the reactions, but I really just need to focus on the modules for now.

### Modules

I'm starting to get the hand of things, and finding out that organic is going to be take-home, and green chem is going to be open book, makes me MUCH happier. I'm still working my way through main group, I've started to re-watch the lectures to make things sink in a little bit and to try and better understand the concepts. Metallosupramolecular still sucks, but at least Dave's bit is far more enjoyable and far more topical to me.

I should probably get started on the assignments... but I'm also trying to catch up on the work that I didn't get on early enough :/