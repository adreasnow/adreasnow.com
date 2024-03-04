# Week 11

## Sunday, 18. October 2020

### 9:19 AM

<span style="color: grey; text-align: center; font-style: italic;" class="center">Changes marked with a ==highlight==</span>

|           |                          S1                          |                          S2                          |                          S3                          |                          S4                          |
| --------- | :--------------------------------------------------: | :--------------------------------------------------: | :--------------------------------------------------: | :--------------------------------------------------: |
| **Gas**   |   Opt/Freq <span style="color: green;">Done</span>   |   Opt/Freq <span style="color: green;">Done</span>   |   Opt/Freq <span style="color: green;">Done</span>   |                         N/A                          |
| **Water** | Implicit Opt <span style="color: green;">Done</span> | Implicit Opt <span style="color: green;">Done</span> | Implicit Opt <span style="color: green;">Done</span> | Implicit Opt <span style="color: green;">Done</span> |



All the jobs are done and there's one big elephant in the room. The relative system energy of S4aq was -10 eV... I'm thinking that It might be a discrepancy between using mixed open/closed shell systems, so I've set off S4aq-B97-3c for another final `Opt Freq` in a UHF calculation. This way, all the jobs will be UHF so it should be more comparable.

<span style="color: grey; text-align: center; font-style: italic;" class="center">Changes marked with a ==highlight==</span>

|           |                        S1                        |                        S2                        |                        S3                        |                          S4                          |
| --------- | :----------------------------------------------: | :----------------------------------------------: | :----------------------------------------------: | :--------------------------------------------------: |
| **Gas**   | Opt/Freq <span style="color: green;">Done</span> | Opt/Freq <span style="color: green;">Done</span> | Opt/Freq <span style="color: green;">Done</span> |                         N/A                          |
| **Water** | Opt/Freq <span style="color: green;">Done</span> | Opt/Freq <span style="color: green;">Done</span> | Opt/Freq <span style="color: green;">Done</span> | Opt/Freq <span style="color: orange;">Running</span> |

## Tuesday, 20. October 2020

### 10:59 AM

There's not really much to report. S4aq-UHF is still optimising.
I spent a decent chunk of time yesterday writing up a second introduction to MM, MD, PFF, EFP and ONIOM, so that I can use those terms in my post-mortem. To be perfectly honest, I have so much stuff going on that I'd really like to get this project finished ASAP. Even if there are more calculations that can be run, once this Opt/Freq finishes, I'm going to just take what I've got and write up my report.

Given that the job is still optimising, however, that might still take a while to accomplish...

## Wednesday, 21. October 2020

### 11:17 PM

The final job just died due to some I/O error, but I've resumed it, albeit with some slightly less tight optimisation/SCF criterion.

## Thursday, 22. October 2020

### 7:04 PM

And the job just died again :unamused:. Requeueing...

## Satuday, 24. October 2020

### 10:04 AM

The job has failed again, and as has happened before, this seems to be happening primarily on the node 'mk19', so I've pulled out the constraint line from [week 8](../Week%2008/#1139-am). It doea mean that it might take a bit to get picked up, but fingers crossed, it shouldn't take too long

```
#SBATCH --constraint="Xeon-E5-2667-v3|Xeon-E5-2680-v3|Xeon-Platinum-8260"
```

### 12:59 PM

That didn't take too long. the Job's been picked up on 'hc06', which it beclieve is a 'high core' count node. Here's hoping it doesn't crash when calculating the full hessian this time...

### 6:33 PM

I've just spent the past six or sour hours slamming out some more of my report. I'm currently at 6380 words and 89 references and have submitted the draft report for peer review.

I feel as though I've completed most of it, thought that will depend on what the results are of the UHF job that's currently running. The post-mortem is complete (unless UHF fixes the SNNH* energy issues), the intro an method are done, the conclusion has a decent start, the abstract I'm leaving till the very end and the results/discussion are templated but not complete.

I'll have a go at discussing what I have, as there are a couple of things to say between the gas and water, but there's really not much TO say unfortunately.

There might be a few fancy figures that I can make... we'll see 

## Sunday, 25. October 2020

### 10:28 AM

It's the last day to post for this blog and I only have bad news really... The UHF job has crashed again and at this point I don't think it's worth trying to get it to run. I could fix the issue by calculating the frequencies numerically, but that job could easily run for a week on its own.

So this is it, I'm going to write up based on what I have and hope that's it's enough.

Adrea out.