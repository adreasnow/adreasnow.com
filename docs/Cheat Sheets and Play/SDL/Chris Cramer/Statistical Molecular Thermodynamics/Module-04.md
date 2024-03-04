# Molecular Partition Functions

!!! info "The base values"
	$$
	\begin{align}
	\beta&=\frac{1}{k_BT}\\
	\Theta_{vib}&=\frac{h\nu}{k_B}\\
	\Theta_{rot}&=\frac{\hbar^2}{2Ik_B}\\
	\end{align}
	$$
	
## Building $Q$ (Monatomic)

### $q_{trans}$

Where the volume of the box that the energy is calculated in is $V= 24.47 dm^3$ by convention

$$
q_{trans}(T,V)=\bigg(\frac{2\pi mk_BT}{h^2}\bigg)^{3/2}V
$$

### $q_{elec}$

Where $g_i$ is the degeneracy of our level.

$$
\begin{align}
q_{elec}(T)&=\sum\limits_i^{levels}\mathrm{g}_ie^{-\beta\epsilon_i}\\
&or\\
q_{elec}(T)&=\mathrm{g}_1e^{\big(\frac{D_e}{k_BT}\big)}\\
\end{align}
$$

Since we want don't really care about absolute energy, we can calculate everything relative to the ground state energy

$$
q_{elec}(T)=\mathrm{g}_1+\mathrm{g}_2e^{-\beta\epsilon_2}+\mathrm{g}_3e^{-\beta\epsilon_3}+...:\hskip{1cm}
$$

The terms get rapidly smaller, so we typically only need one to three terms, depending on whether or not there's a low lying excited state $(\epsilon_0-\epsilon_1\leq12\kjmol)$

!!! note
	You can calculate the contribution of the state to the partition function by using $\exp\big(-\epsilon_j/k_BT\big)$<br/>
	e.g.
	

	$$
	\exp\bigg(\frac{(-12\;KJ\cdot mol^{-1})(1000\;J^{-1})}{(1.380\e{-23}\; J\cdot K^{-1})(293\;K)(6.022\e{23}\:mol^{-1})}\bigg)=0.00724
	$$

??? info "Personal note"
	It was at this point that I realised that Avogadro's number has units of $mol^{-1}$, not $mol$ :unamused:

### Total Internal Energy (Monatomic)

We can now calculate the total internal energy of these two terms from the equation
$$
U=\color{purple}\frac{3}{2}N_Ak_BT\color{black}+\color{orange}N_A\mathrm{g}_2\epsilon_2exp\bigg(\frac{-\epsilon_2}{k_BT}\bigg)
$$
Since the electronic term only involves the first excited state, it will have a very small contribution to $U$

!!! note "Example"
	$$
	\begin{align}
	exp\bigg(\frac{-\epsilon_2}{k_BT}\bigg)&=\exp\bigg(\frac{(-178\;KJ\cdot mol^{-1})(1000\;J^{-1})}{(1.380\e{-23}\; J\cdot K^{-1})(298\;K)(6.022\e{23}\:mol^{-1})}\bigg)=6.9433\e{-32}\\
	q_{elec}&=N_A\mathrm{g}_2\epsilon_2exp\bigg(\frac{-\epsilon_2}{k_BT}\bigg)\\
	&=(6.022\e{23}\:mol^{-1})(2)(2.96053\e{−19}\:KJ)(6.9433\e{-32})\\
	&=2.4757403\e{-29}\:\kjmol
	\end{align}
	$$

## Building $Q$ (Diatomic)

![!](https://chem.libretexts.org/@api/deki/files/55788/800px-Morse-potential.png?revision=2&size=bestfit&width=505&height=417){: style="width: 50%; "class="center"}

### $q_{vib}$

$$
\begin{align}
q_{vib}(T)&=\sum\limits_{n=0}^\infty e^{-\beta\epsilon_{vib}}=\frac{e^{\big(\frac{-h\nu}{2k_BT}\big)}}{1-e^{\big(\frac{-h\nu}{k_BT}\big)}}\\\\
&\hskip{2.5cm}or\\
q_{vib}(T)&=\frac{e^{\big(\frac{-\Theta_{vib}}{2T}\big)}}{1-e^{\big(\frac{-\Theta_{vib}}{T}\big)}}:\hskip{1cm} \Theta_{vib}=\frac{h\nu}{k_B}
\end{align}
$$

### $q_{rot}$

$$
\begin{align}
q_{rot}(T)&=\sum\limits_{J=0}^\infty(2J+1)e^{\big(\frac{-\Theta_{rot}J(J+1)}{T}\big)}: \hskip{1cm} \Theta_{rot}=\frac{\hbar^2}{2Ik_B}\\
&\hskip{3cm}or\\
q_{rot}(T)&=\frac{8\pi^2Ik_BT}{h^2}:\hskip{1cm} \Theta_{rot}<<T
\end{align} 
$$

### Molecular Partition Function (Diatomic)

$$
\begin{gather}
q(V,T)=\color{purple}q_\text{trans}\color{black}+\color{blue}q_\text{rot}\color{black}+\color{red}q_\text{vib}\color{black}+\color{orange}q_\text{elec}\\
q(V,T)=\color{purple}\bigg(\frac{2\pi mk_BT}{h^2}\bigg)^{3/2}V\color{black}\cdot\color{blue}\frac{T}{\sigma\Theta_{rot}}\color{black}\cdot\color{red}\frac{e^{\big(\frac{-\Theta_{vib}}{2T}\big)}}{1-e^{\big(\frac{-\Theta_{vib}}{T}\big)}}\color{black}\cdot\color{orange}\mathrm{g}_1e^{\big(\frac{D_e}{k_BT}\big)}
\end{gather}
$$

### Ensemble Partition Function (Diatomic)

$$
Q(N,V,T)=\frac{q(V,T)^N}{N!}
$$



### Total Internal Energy (Diatomic)

We can now calculate the total internal energy of these two terms from the equation


$$
\begin{gather}
\bar U=\color{purple}\bar U_{trans}\color{black}+\color{blue}\bar U_{rot}\color{black}+\color{green}U_{VPVE}\color{black}+\color{red}\bar U_{vib}\color{black}+\color{orange}\bar U_{elec}\\
\bar U=\color{purple}\frac{3}{2}RT\color{black}+\color{blue}RT\color{black}+\color{green}R\frac{\Theta_{vib}}{2}\color{black}+\color{red}R\frac{\Theta_{vib}}{e^{\big(\frac{\Theta_{vib}}{T}\big)}-1}\color{black}-\color{orange}N_AD_e
\end{gather}
$$

## Building $Q$ (Polyatomic)

Translational and electronic energy are the same as with diatomic, but rotational and vibrational differ.

### $q_{rot}$

![!](https://images.slideplayer.com/24/7358520/slides/slide_13.jpg){: style="width: 50%; "class="center"}

$\sigma=$ the symmetry number (similar to degenerate rotational states)


$$
\begin{align}
\text{For a spherical top:}\\
q_{rot}(T)&=\frac{\pi^{1/2}}{\sigma}\bigg(\frac{T}{\Theta_{rot}}\bigg)^{3/2}\\
\text{For a symmetric top:}\\
q_{rot}(T)&=\frac{\pi^{1/2}}{\sigma}\bigg(\frac{T}{\Theta_{rot,A}}\bigg)\bigg(\frac{T}{\Theta_{rot,B}}\bigg)^{1/2}\\
\text{For an asymmetric top:}\\
q_{rot}(T)&=\frac{\pi^{1/2}}{\sigma}\bigg(\frac{T^3}{\Theta_{rot,A}\Theta_{rot,B}\Theta_{rot,C}}\bigg)^{1/2}
\end{align}
$$

### $\bar U_{rot}$

$$
\bar U_{rot}=\frac{3}{2}RT
$$

### $q_{vib}$

$$
q_{vib}(T)=\prod\limits_{j=1}^\alpha\frac{e^{\big(\frac{-\Theta_{vib}}{2T}\big)}}{1-e^{\big(\frac{-\Theta_{vib}}{T}\big)}}
$$

### $\bar U_{vib}$

$$
E_{vib}=N_Ak_B\sum\limits_{j=1}^\alpha\Bigg(\frac{\Theta_{vib,j}}{2}+\frac{\Theta_{vib,j}}{e^{\big(\frac{\Theta_{vib}}{T}\big)}-1}\Bigg)
$$

