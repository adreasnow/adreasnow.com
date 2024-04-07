# Statistics

!!! info "RMSD/MAE"
	According to [jilmun](https://medium.com/human-in-a-machine-world/mae-and-rmse-which-metric-is-better-e60ac3bde13d) RMSD is better as a metric for systems in which larger errors/deviations are more disfavoured than smaller errors, e.g. if an error of 10 is more than twice as bad than an error of 5.

## Root Mean Square Deviation/Error (RMSD/RMSE)

A useful tool for checking the overall variance of a system

* How well does the result agree with the literature value
* How much does a structure deviate from an expected structure
* In in units of the dependent variable
* Smaller is better



$$
RMSD/RMSE=\sqrt{\frac{\sum{_{i=1}^n (\hat y_i-y_i)^2}}{n}}
$$

Where:

* $\hat y_i=$ Predicted value of the dependent variable
* $y_i=$ Dependent variable

!!! note
	I can never remember which is the expectation or the predicted value, but it doesn't actually matter, since the you're squaring the value, the sign is irrelevant anyway :sweat_smile:

This can be normalised to be able to compare between datasets of different scales as:

$$
NRMSD=\frac{RMSD}{y_\text{max}-y_\text{min}}
$$

=== "Python"
	

	```python
	import numpy as np
	
	def rmsd(expectation, predictedList):
	    rmsd = np.sqrt(np.divide(np.sum(np.square(np.subtract(predictedList, expectation))),np.shape(predictedList)[0]))
	    return rmsd
	```
	This is vectorised in numpy rather than iterating on each value, making it much much faster than a pure python implementation.

=== "Excel"
	

	`=RMSD(x,y,type)`
	Type:
	
	1. RMSD
	2. Normalised RMSD
	3. Coefficient of RMSD



## Mean Absolute Deviation/Error (MAD/MAE)

Is the arithmetic average of absolute errors

$$
MAD/MAE=\frac{\sum{_{i=1}^n|y_i-x_i|}}{n}
$$

Where:

* $y_i=$ Predicted value

* $x_i=$ True value

