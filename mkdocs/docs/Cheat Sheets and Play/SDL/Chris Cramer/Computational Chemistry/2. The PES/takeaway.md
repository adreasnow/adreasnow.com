# The Takeaway

!!! Warning
	Don't waste time evaluating $\Xi(r)$ (property of the geometry we're interested in) if $P(r)$ (the probability of the geometry) is zero

The primary goal of MM simulations is to create a sample of energies/geometries that allow you to integrate over all of phase space to calculate an [expectation value](.././02.07/#integrating-over-phase-space) for the system you're trying to uncover.

Since the process of doing so realistically would require you to calculate every geometry/momentum, many of which would ultimately give non-useful results, MD and MC allow for simplifications to the process. MC by strategically randomising the process (only evaluating values that will give us an actual result) and MD by calculating forces and applying them to the system.

In this equation:

* $\big\langle\Xi\big\rangle=$ the expectation value of the property we're interested in
* $\Xi_i(r_i)=$ the property of the geometry we're interested in for the step $i$
* $M=$ is the number of samples we have

$$
MC/MD\:\big\langle\Xi\big\rangle=\frac{1}{M}\sum\limits_{i=1}^M{\Xi_i(r_i)}
$$

It is a simplification of the *real* equation:

* $\big\langle\Xi\big\rangle=$ the expectation value of the property we're interested in
* $\Xi(r)=$ the property of the geometry we're interested in
* $P(r)=$ the probability of the geometry existing

$$
\big\langle\Xi\big\rangle=\frac{\int_{PS}\Xi(r)P(r)dr}{\int_{PS}P(r)dr}
$$

in which we integrate over ALL of phase space, which includes a lot of zero probability geometries 

The simplification allows us to brute force integrate (if integration is just continuous addition, we can just add our probabilities) by adding only the geometries with a non zero (realistic) probability,

