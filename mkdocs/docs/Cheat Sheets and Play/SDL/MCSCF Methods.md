# MCSCF Methods

## [David Sherril](https://www.youtube.com/watch?v=MlbKoXACAx8&list=WL&index=10)

* If we consider a single determinant for our excited state with one excited electron( $\ket{\phi^a_i}$), it would roughly describe the state, but:
  1.  The orbitals may not be the most appropriate, since they're based on the ground state HF wavefunction
  2.  There is a mirror half of the wavefunction that is neglected, where the spins are flipped, as well as any other determinants that may contribute
* When we solve for the Schrödinger equation, there are many different solutions that we can use, and typically we'd only solve it for the lowest state, but we could also solve it for multiple roots.
  * We can do this using CIS to create a full Hamiltonian of all the determinants of each configuration, and solve for each of our roots to get an exact solution, but at the singles level, this lacks dynamic correlation, which means that it's only an HF quality wavefunction, giving errors of ~1 eV
    * If you wanted to include dynamic correlation of these singly excited determinants, you'd need to include double excitations on top them, which would mean explicit triple excitations on top of the ground state which would be unattainably expensive.
    * We could improve this by adding in perturbative double excitations as CIS(D) (of Head-Gordon fame), which would give errors of ~0.5 eV
* We could also use 'response theory' which uses the "sum over states" expression to calculate the frequency dependent polarisability:
  * Where:
    * $\omega=$ frequency
    * $\Psi_0=$ ground state wavefunction
    * $\Psi_i=$ excited state $i$ wavefunction
    * $E_0=$ ground state energy
    * $E_i=$ excited state $i$ energy

$$
\braket{\alpha}_\omega=\sum^{states}_{i\neq0}\frac{|\bra{\Psi_0}\mu\ket{\Psi_i}|^2}{\omega-(E_i-E_0)}
$$

* The Excitation energies ($\Delta E=(E_i-E_0)$) can be calculated from $\braket{\alpha}_\omega$ where $\omega=\Delta E$
* TD-DFT uses a linear response method and for valence excited states gives errors of ~0.3 eV. They're generally not appropriate for Rydberg or charge-transfer states, as DFT treats long range interactions improperly, however range separated hybrids (ωB97X-D, ωPBE) that use decent HF exchange or asymptotically corrected functionals (CAM-B3LYP) can be used in these circumstances.
* EOM-CCSD is the excited state equivalent of CCSD. In these you:
  1. Solve your normal CCSD ground state equations to get your $\hat{T}$ amplitdes
  2. Perform a "similarity transformation" transformations 
  3. Apply the linear excitation operator to get the excited states
     * Produces errors of ~0.2 eV for single excitations, but doesn't perform as well for doubles.

* Other approaches
  * There isn't a clear cut approach to doing perturbative triples for EOM-CCSD(T), but there are a few methods floating around
  * CC2 and CC3 sit at an intermediate quality between MP2 and CCSD, and there is an EOM-CC2, but not EOM-CC3
* MCSCF for excited states
  * We can get excited states from MCSCF, by calculating higher roots   of the CI. This can treat the ground and excited states at comparable quality, however lacks dynamic correlations
  * For that we need apply some post MCSCF treatment, like CASPT2 or multireference CI (MRCI)

* Semiempiricial Methods
  * ZINDO can be used, but TD-DFT is more commonly used, since it's more accurate and reasonably fast these days

* Adiabatic excitation energies require analytic gradients for the excited state, which are available for CIS, CIS(D), TDDFT, CASSCF, CASPT2 and EOM-CCSD
  * This can be tricky if there are close lying PES though, as the optimiser could surface hop between states.




## [Stephan Sauer](https://www.youtube.com/watch?v=oGEYIZNUEkg)

* Orbitals worth including in your active space:
  * Degenerate or near-degenerate orbitals
  * Orbitals that are directly related to the chemistry of the problem
    * Photoinduced bond cleavage ⟹ bonding orbitals
    * Emission spectra ⟹ valence orbitals, 𝜋-systems 
  * Contrasting empty orbitals
    * e.g. antibonding orbital for bond breaking
    * "At least as many empty orbitals"