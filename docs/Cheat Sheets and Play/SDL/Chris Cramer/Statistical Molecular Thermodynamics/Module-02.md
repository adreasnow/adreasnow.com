# Gases

## Ideal Gas Equation of State

!!! note "Definitions"
	**Equations of state** detail the mathematical relationship between the physical observables pressure, volume and temperature<br/>
	**Extensive variables** depend on the size of the system<br/>
	**Intensive variables** are independent on the size of the systems

An *ideal gas* is one that obeys the equation of state:

$$
\begin{gather}
PV=nRT\\
or\\
P\bar V=RT:\hskip{1cm}\bar V=\frac{V}{n}
\end{gather}
$$

Using $\bar V$ allows us to differentiate between size extensive variables ($V, m, E$) and size intensive variables ($T, P, \rho$)

### Modifying variables

$$
\begin{align}
P_1\bar V_1&=P_2\bar V_2 \text{  (Boyle's Law)}\\
\frac{\bar V_1}{T_1}&=\frac{\bar V_2}{T_2}\:\:\:\:\:\text{(Charles' Law)}\\
\frac{P_1}{T_1}&=\frac{P_2}{T_2}\:\:\:\:\:\text{(Amonton's Law)}\\
\frac{V_1}{v_1}&=\frac{V_2}{n_2}\:\:\:\:\:\text{(Avogadro's Law)}
\end{align}
$$

Thais comes about because as we rearrange the ideal gas equation we can move any constants to one side and any variables to the other and the relationship between the variables will remain the same

$$
\begin{gather}
\text{constants}=\text{variables}\\
\text{variables}_1=\text{variables}_2
\end{gather}
$$

## Non Ideal Gas Equations of State

### Van der Waals

!!! warning
	There are better equations, but the vdW equation is good for learning

Where $a\sim$ intermolecular interaction strength and $b\sim$ molecular size

$$
\begin{gather}
\bigg(P+\frac{a}{\bar V^2}\bigg)(\bar V-b)=RT\\
P=\bigg(\frac{RT}{\bar V-b}\bigg)-\bigg(\frac{a}{\bar V^2}\bigg)
\end{gather}
$$

$$
\begin{matrix}
 & a\:(dm^6\cdot bar\cdot mol^{-2}) & b\:(dm^3\cdot mol^{-1})\\
 \ce{He} & 0.035 & 0.024\\
\ce{NH3} & 4.304 & 0.037\\
 \end{matrix}
$$

!!! note
$$
	\bar V^{-1}=\rho
$$
If we fit the vdW equation to experimental PV plots, since the vdW equation is cubic, there will be an isotherm where the three roots converge and the equation forms an inflection point. This point marks the inflection point, which can be used to determine the parameters $a$ and $b$.

![!](https://carnotcycle.files.wordpress.com/2014/03/lg203.jpg?w=491&h=485){: style="width: 40%; "class="center"}

To obtain these parameters we can use some algebraic rearrangements to find the following relationships

$$
\bar V_c=3b\hskip{1cm}P_c=\frac{a}{27b^2}\hskip{1cm}T_c=\frac{8_a}{27bR}
$$

### The law of Corresponding States

!!! note "Critical Constants"
	**Critical Temperature** ($T_c$) is the temperature above which the gas cannot be liquefied <br/>
	**Critical Pressure** ($P_c$) is the minimum pressure that needs to be applied at $T_c$ to bring about liquefaction

Says that all gases have the same properties if compared at corresponding conditions. these conditions are their conditions relative to their critical point, and so we can use their *reduced* properties to compare them

$$
P_R=\frac{P}{P_c}\hskip{1cm}\bar V_R=\frac{\bar V}{\bar V_c}\hskip{1cm}T_R=\frac{T}{T_c}
$$

A universal gas law (derived from the vdW equation) would look like:

$$
\bigg(P_R+\frac{3}{\bar V^2_R}\bigg)\bigg(\bar V_R-\frac{1}{3}\bigg)=\frac{8}{3}T_R
$$

Where $Z=\frac{PV}{RT}$ (compression factor)

![!F11_27](http://thermopedia.com/content/5228/GasLF2.gif){: style="width: 50%; "class="center"}

## Intermolecular interactions

An observation can be made that at long range, molecules tend to be attracted to each other, but at short range they tend to be repulsive, as electron clouds start to overlap. We can describe this as:

$$
\begin{matrix}
\text{At long range:} & r(r ) \to -\frac{c_6}{r^6} & \text{(attractive)}\\
\text{At short range:} & r(r ) \to -\frac{c_12}{r^12} & \text{(repulsive)}
\end{matrix}
$$

### Lennard-Jones Potential

This can be added up to give the LJ equation, where $\epsilon$ has units of energy ($\kjmol$), representing the depth of the attractive well (from zero to -ve) and $\sigma$ has units of distance ($\AA$), representing the distance from overlap to neutral attraction/repulsion.

$$
u(r)=4\epsilon\bigg[\bigg(\frac{\sigma}{r}\bigg)^{12}-\bigg(\frac{\sigma}{r}\bigg)^{6}\bigg]
$$

![!](https://chem.libretexts.org/@api/deki/files/167669/imageedit_6_9194242771.png?revision=1){: style="width: 30%; "class="center"}

Our constants from before can be calculated as

$$
\begin{gather}
c_{12}=4\epsilon\sigma^{12}\\
c_{6}=4\epsilon\sigma^{6}
\end{gather}
$$

### $r^{-6}$ Interactions

Where:

* $4\pi\eo=$ the permittivity of free space ($C^2\cdot J^{-1}\cdot m$)
* $\alpha=$ the polarisability of the molecule ($C\cdot m^2\cdot V^{-1}$)
* $I=$ the ionisation potential ($J$).

#### Dipole-Dipole Interactions

$$
u_{d,d}(r)=-\frac{2\mu_1^2\mu_2^2}{(4\pi\eo)(3k_BT)}\frac{1}{r^6}
$$

#### Dipole-Induced Dipole Interactions

$$
u_{\text{induced}}(r)=-\frac{\mu_1^2\alpha_2}{(4\pi\eo)^2r^6}-\frac{\mu_2^1\alpha_1}{(4\pi\eo)^2r^6}
$$

#### Dispersion Interactions

$$
u_{\text{disp}}(r)=-\frac{1}{3}\frac{I_1I_2\alpha_1\alpha_2}{(I_2+1_2)(4\pi\eo)^2}\frac{1}{r^6}
$$

