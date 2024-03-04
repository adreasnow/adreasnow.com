# Atomic Partition Functions

## Boltzmann Probability

Boltzmann came up with two big equations, where $W=$ number of microstates and $R=$ gas constant

$$
\begin{gather}
S=k_B\ln W\\
R=k_BN_A
\end{gather}
$$

## Partition Function

!!! info "Fundamental postulate of statistical thermodynamics"
	The Expectation value $\big\langle x\big\rangle$ is an average over possible values

Is an effective measure of the "accessible number of energy states"

Where:

* $N=$ Number of molecules
* $V=$ Volume
* $T=$ Temperature
* $E_j=$ Energy of the microstate

$$
\begin{matrix}
Q(N,V,T)=\sum\limits_j^{\text{states}}e^{-\beta E_j(N,V)}:& \hskip{1cm}\beta=\frac{1}{k_BT}\\
or\\
Q(N,V,T)=\sum\limits_j^{\text{states}}\exp\bigg(\frac{-E_j(N,V)}{k_BT}\bigg)
\end{matrix}
$$

!!! note
	This is the theoretical backing of the [FPD](../../../../../Homeless%20Equations/comp-thermo/#boltzmann-distributions-fractional-population-distribution)



So we can calculate the expectation value of energy fro the partition function

Where:

* $\big\langle E\big\rangle=$ Expectation energy of the system

$$
\begin{matrix}
\big\langle E\big\rangle=\sum\limits_j\frac{E_j(N,V)e^{-\beta E_j(N,V)}}{Q(N,V,\beta)}:& \hskip{1cm}\beta=\frac{1}{k_BT}\\
\hskip{1.7cm}or\\
\big\langle E\big\rangle=\sum\limits_j\frac{E_j(N,V)\exp\bigg(\frac{-E_j}{k_BT}\bigg)}{Q(N,V,T)}
\end{matrix}
$$

### Ensemble Partition Function

The canonical partition function is based on the sum of molecular partition functions $q(V,T)$

$$
\begin{align}
Q(N,V,T)&=\sum\limits_i\exp\bigg(\frac{-[\sum_j\epsilon_j(V)]_i}{k_BT}\bigg)\\
&=\frac{[q(V,T)]^N}{N!}
\end{align}
$$

### Molecular Partition Function

!!! info
	More info can be found [on WikiBooks](https://en.wikibooks.org/wiki/Statistical_Thermodynamics_and_Rate_Theories/Molecular_partition_functions)

Since we already calculated the total energy of a molecule, we can build a molecular partition function from the energy of all the possible energy levels


$$
\begin{align}
q(V,T)&=\sum\limits_i\exp\bigg(\frac{-(\epsilon_{trans}+\epsilon_{rot}+\epsilon_{vib}+\epsilon_{elec})_i}{k_BT}\bigg)\\
&=\sum\limits_i\exp\bigg(\frac{-\epsilon_{trans,i}}{k_BT}\bigg)
\sum\limits_j\exp\bigg(\frac{-\epsilon_{rot,j}}{k_BT}\bigg)
\sum\limits_k\exp\bigg(\frac{-\epsilon_{vib,k}}{k_BT}\bigg)
\sum\limits_l\exp\bigg(\frac{-\epsilon_{elec,l}}{k_BT}\bigg)
\end{align}
$$

To avoid counting degenerate states, we can use the energy levels, instead of the energy states and multiply by the number of degenerate states. Given the degeneracy of rotational states $\mathrm{g}_J=2J+1$


$$
\begin{align}
q_{rot}(V,T)&=\sum\limits_{j,states}e^{-\beta\epsilon_j}=e^{-E_{j=0}/k_BT}+e^{-E_{j=1}/k_BT}+e^{-E_{j=1}/k_BT}+e^{-E_{j=1}/k_BT}+...\\
q_{rot}(V,T)&=\sum\limits_{j,levels}\mathrm{g}_je^{-\beta\epsilon_j}=1e^{-E_{j=0}/k_BT}+3e^{-E_{j=1}/k_BT}+...
\end{align}
$$
