---
layout: default
---

## Useful Commands

### Access your computing cluster faster:

1. Open the /etc/hosts file on your local desktop. You will have to be a superuser to do this. On a terminal, type (assuming you have vi or else use your favorite editor) `sudo vi /etc/hosts`

1. Add the following line to the end of /etc/hosts file:
   `12x.xxx.xxx.xxx your.cluster.address.edu mycluster`
   
1. To access the cluster, you can now type
   `ssh -X username@mycluster`
   If your username on the local Desktop is the same as that on your cluster you can simply type 
   `ssh -X mycluster`
   ps: `-X` enables X11 forwarding, that is, you can use graphical applications over the ssh session
   
Avoid typing password to access your cluster:
1. On a terminal on your local desktop, type
ssh-keygen -t rsa
Hit Enter when prompted with location or passphrase and until you get the prompt back. This will generate a public/private key pair in your ~/.ssh directory.
2. Copy the newly generated public key to the cluster typing the following:
ssh-copy-id -i ~/.ssh/id_rsa.pub username@mycluster
Note that here I assume you have access to the cluster without typing the full address (by following the preceding instruction).
3. You should now be able to enter the cluster by typing the following without being prompted to tell your password:
ssh -X username@mycluster

On Ubuntu 14.04, access mycluster via nautilus (windows) to drag/drop files:
1. Open a Files folder. Go to File and Connect to Server...
2. On the server address type: sftp://username@mycluster if you have fast access or type the full address: sftp://username@your.cluster.address.edu
3. Click Connect. You should now be able to access the files on the cluster in folder (nautilus) format.

On Linux, access ip address:
The command is ifconfig. This should print out a series of info about internet connections. Sometimes you run this via /sbin/ifconfig

SLURM bits:
1. To see a full output play with the numbers in the following command: squeue -u youruserid -o "%.18i %.9P %.8j %.8u %.2t %.10M %.6D %R"
My job names tend to be long depending on how deep into the project I am. So increasing character limit on $.8j is often useful. j is for the job name.

Useful lines to add to .bashrc file:
 1. (-TS) Good ideas at tldp.org/LDP/abs/html/sample-bashrc.html 
 2. (-TS) For easy navigating at the command line, consider marking folders (marka) for a quick return (cd $a):
alias marka='a=`pwd`; echo "a=$a" >> ~/.foldershortcuts'
alias markb='b=`pwd`; echo "b=$b" >> ~/.foldershortcuts'
source ~/.foldershortcuts

Extract the data corresponding to thermodynamics from a log.lammps file:
1. In a file (I call it cleanlog.sh) insert the following code (it is a shell script that uses awk to get the desired output):
#!/bin/sh
# the script below cleans up log.lammps to get thermo out
file=log.lammps
if test -s $file 
then
awk '
/Step/,/Loop/ { print }
' $file > x.dat
awk '
!($0 ~ /Step/) { print }
' x.dat > y.dat 
awk '
!($0 ~ /Loop/) { print }
' y.dat > thermo.dat 
rm x.dat
rm y.dat
echo "Generated thermo.dat"
echo "Done!"
else
echo "where is log.lammps?"
fi 
2. In the folder that has the log.lammps file, type sh cleanlog.sh. This should create a thermo.dat file with only the columns corresponding to the thermodynamics data.

Using awk:
1. Often when dealing with data files, we need to select data higher than a particular row, merge files with columns into one file, or select certain columns from a file and generate a new file. The following shell script accomplishes that. 
Say you want to select all rows higher than row 1 from file1.out and all rows higher than row 2 from file 2.out. Then you want to merge together the resulting files. After that you want to select only some columns from the merged file and store it in a new file.
In a file (I call it fixdata.sh) insert the following code:
#!/bin/sh
# describe your script (this is a comment)
awk 'NR>1 {print $0}' file1.out > tmp.file1.out
awk 'NR>2 {print $0}' file2.out > tmp.file2.out
paste tmp.file1.out tmp.file2.out |awk '{print $2 "  " $4 "  " $11 "  " $12}' > file3.out
rm tmp.file1.dat
rm tmp.file2.out

Note that I have assumed the merged file has at least 12 columns.
In the folder that has the above .out files and .sh file, type sh fixdata.sh. This should create a file3.out with the desired output.
A side note: You do not need a script to perform the above action. Directly typing the last 5 lines on terminal prompt should do the same thing. I like to save it as a shell script because it can be integrated as a post-processing code in LAMMPS. So after my runs have finished, I often add shell sh fixdata.sh. This generates the final file for me and I find this to be cleaner than post-processing on a terminal or including the above code in LAMMPS via the shell command.
2. Passing variables in awk:
If you have variables var1 and var2, the way to pass them in awk is to use the -v option. So you would write something like:
awk -v v1=$var1 -v v2=$var2 'BEGIN {print v1 "  " v2}'
where I am printing them out. v1 and v2 are the dummy names, you can use the original variable names (var1 and var2) as the awk variables as well, however, I do not do that for clarity.
Often one wants to manipulate columns of datafiles (say multiply a column by a variable and add it to a column of the same file or another file, etc.) and write into a new one. The passing of variables in awk is useful in that case. 
Following is an example:
paste file1.out file2.out | awk -v v1=$var1 -v v2=$var2 '{print ($1*v1/v2) + $3 "  " $2}' > file3.out

Useful terminal commands:
1. If you want to find a file, say myfile1.txt use: find -name "myfile1.txt"
Run it from a directory where you think the file might be in. Use of * as in "myfile*.txt" is permitted in the usage.
2. Say you want to copy one file to many directories that share a common start name dir. Use: echo dir* | xargs -n 1 cp filename 
3. Delete a file from many directories in a folder. Use: find /path/to/the/directory/ -name "file" -delete
Here /path/to/the/directory/ is the full path to the folder in which there are many directories that you want to access and remove the file from. 
4. Merge many eps or pdf files into one pdf file. Use: gs -dBATCH -dNOPAUSE -q -sDEVICE=pdfwrite -dPDFSETTINGS=/prepress -sOutputFile=merged.results.pdf file1.eps file2.eps file3.eps 
5. Delete first 10 (example number) lines from a text file. Use: tail -n +11 file.txt > newfile.txt 
Delete last 3 lines from a text file. Use: head -n -3 myfile.txt > newfile.txt 
Do the above actions in one step and get the edits in the original filename. Use: tail -n +11 file.txt | head -n -3 > newfile.txt && mv newfile.txt file.txt
6. cut is an amazing tool. say you have a variable that could be a string like "something happens at 74874". store this in a variable var="something happens at 74874". echo $var will produce the string. cut enables you to have any part of this. say you want the word some, do echo $var | cut -c1-4. if you want the number at the end, count the characters and cut accordingly: echo $var | cut -c22-27. In shell scripts, this can work magic.

Useful shell scripting commands:
1. Convert a number to its absolute value, that is, remove the - sign: 
num=-29
echo $num #produces -29
echo ${num} #produces -29
echo ${num#-} #produces 29

Useful Kate (editor) features: 
1. You can do cool sed-like regular expression replacements using Command Line. Press F7 and enter s/oldtext/newtext/g to replace "oldtext" with "newtext" throughout the current line. 

On Gnuplot: 
1. To increase the spacing between dashes or dots when using lines to plot lines, you can change the dl value at set term, as in
set terminal postscript eps enhanced color dl 2.0
This will change the spacing between dashes etc. for all lines; set term (without the dl specification) again for a later plot if you want to return to default. Increase the number to get larger spacings.
2. This document shows how to use TeX fonts in Gnuplot (useful for generating figures when writing papers). 
3. Sometimes you need to increase the samples gnuplot uses to plot data so as to have a correct representation of the function you are plotting. For example, if you plot sin(x) from [0:10], it will plot it fine. However, if you plot over a much wider range, say [0:100], you will get an inaccurate graph. To fix this, use set samples 1000 before your plot command. Increase the number of samples as per your needs.

On Figures:
1. Reducing size of figures (tip shared by Rastko): How to convert EPS figures to EPS figures with smaller size. If the original figure is fig.eps:
Step 1: 
gs -r300 -dEPSCrop -dTextAlphaBits=4 -sDEVICE=png16m -sOutputFile=fig.png -dBATCH -dNOPAUSE fig.eps
Step 2: 
convert fig.png eps3:fig_new.eps
fig_new.eps is an EPS figure with a much smaller size.
Note: this makes figure a bitmap, so scalability is lost; do it only when the figure is final.

2. How to convert eps figure to png. Sometimes using ps2png ends up giving black background, sometimes ps2png is not available on your system. In that case do
convert -density 1000 figure.eps -flatten figure.png
Playing with the density value changes the quality (1000 was ideal for me). -flatten gets rid of the black background.

Working with LAMMPS:
1. For all unit styles except lj, the scale argument is specified in the distance units defined by the unit style. For example, in real or metal units, if the unit cell is a unit cube with edge length 1.0, specifying scale = 3.52 would create a cubic lattice with a spacing of 3.52 Angstroms. In cgs units, the spacing would be 3.52 cm. For unit style lj, the scale argument is the Lennard-Jones reduced density, typically written as rho*. LAMMPS converts this value into the multiplicative factor via the formula "factor^dim = rho/rho*", where rho = N/V with V = the volume of the lattice unit cell and N = the number of basis atoms in the unit cell (described below), and dim = 2 or 3 for the dimensionality of the simulation. Effectively, this means that if LJ particles of size sigma = 1.0 are used in the simulation, the lattice of particles will be at the desired reduced density.

2. Computing averages from the data LAMMPS produces usually requires the use of fix ave/time command. The key point to note here is:
The Nevery, Nrepeat, and Nfreq arguments specify on what timesteps the input values will be used in order to contribute to the average. The final averaged quantities are generated on timesteps that are multiples of Nfreq. The average is over Nrepeat quantities, computed in the preceding portion of the simulation every Nevery timesteps. Nfreq must be a multiple of Nevery and Nevery must be non-zero even if Nrepeat is 1. Also, the timesteps contributing to the average value cannot overlap, i.e. Nfreq > (Nrepeat-1)*Nevery is required.
For example, if Nevery=2, Nrepeat=6, and Nfreq=100, then values on timesteps 90,92,94,96,98,100 will be used to compute the final average on timestep 100. Similarly for timesteps 190,192,194,196,198,200 on timestep 200, etc. If Nrepeat=1 and Nfreq = 100, then no time averaging is done; values are simply generated on timesteps 100,200,etc.

3. A standard harmonic energy expression looks like (1/2) k (x-x0)^2. For many such potential forms in LAMMPS the built-in expression is K (x-x0)^2. So if your conventional force constant is 10, what you will enter in the input script is K=10/2 that is K = 5. This applies to functions in angle_style, bond_style, improper_style. See particularly the harmonic styles in each of these categories. 

4. You may want to recompile LAMMPS and generate another executable (for example, if you want to update the source files or change some settings in the Makefile that produced the current LAMMPS exectuable you are using). To do this:
A. The Makefile (say Makefile.lmp) that generated the current LAMMPS executable (say lmp) will be in the the src/ folder; likely in the MAKE folder inside the src/ directory. First, copy the old LAMMPS Makefile to a new Makefile. So you want to run: cp Makefile.lmp Makefile.lmp.new1
B. Do the edits. This may include changing the compiler settings in Makefile.lmp.new1, for example changing -O2 to -O3 or adding new source files to the src/ folder.
C. From the src/ directory run make new1. For a faster make, run make -j 4 new1
D. You should now see a new executable lmp.new1 in the src/ folder. You can copy this to wherever you want to run the simulation from or provide a path to this file.

5. Sometimes when I would restart from a restart file that was generated following a shear simulation, I would get the error: 
ERROR: Triclinic box skew is too large site
To fix this add 
box tilt large
before the read_restart command that reads your restart file.

6. I found LAMMPS manual to be not clear about how it gets information regarding the torsional potential in a simulation. This potential involves the dihedral angle phi. The diagram in the manual suggests which direction of phi is positive. The sign convention is important, the manual says: "This sign convention effects several of the dihedral styles listed below (e.g. charmm, helix) in the sense that the energy formula depends on the sign of phi, which may be reflected in the value of the coefficients you specify." In the same spirit, it seems that (certainly for some dihedral styles) it is important to know what LAMMPS assumes as the conformation that corresponds to phi=0 when it interprets the energy formulas. For example, in the case of multi-harmonic style, the torsional potential has the form V(phi) = a1 + a2*cos(phi) + a3*cos^2(phi) + a4*cos^3(phi), taking a5=0. For the trans conformation (common in simulation of polymer chains like PE) the set of coefficients (a1,a2,a3,a4) can be chosen in the energy formula assuming the trans formation as the origin of the angle phi (indeed this happens in several papers likely due to the fact that the trans formation is the minimum of the associated torsional potential). On the other hand, the coefficients can be chosen assuming the cis conformation as the origin of angle phi, that is, phi=0 is when the 4 atoms form a cis shape, which means the trans in this choice of coordinates will be phi=pi. The coefficients you specify in the input script would change depending on what convention LAMMPS has used. I find that LAMMPS uses the cis conformation as the origin of angle phi. So if in the literature you find the set (a1,a2,a3,a4) as specifying the torsional potential assuming the trans formation as the origin of phi (cis would be phi=pi in that case), do not enter a1,a2,a3,a4 in input script. Instead enter: a1,-a2,a3,-a4.

7. (-TS) FOR loops are possible and useful in LAMMPS input scripts, like this loop from 1 to 100 in in.melt.  This style is a trick that allows changing the script during a simulation, since "jump" causes LAMMPS to reread in.melt.  Also, the "variable s" trick allows some command (displace_atoms here) to occur only every 20th loop.
label loopstart
variable iter loop 1 100
  run 1000
  # Displace atoms every 20th iteration
  variable s equal (${iter}-(20*floor(${iter}/20)))
  if "0==$s" then "displace_atoms all move 0 0 -1 units box"
next          iter
jump          in.melt loopstart

8. (-TS) Get LAMMPS to record the largest positive x-force experienced by each atom.  Just add the following code to your input script.  The idea is to define an array fmax[*]=0.0 and then each time step execute: for (i=1 to natoms) fmax[i]=max(fmax[i],fx[i]).
# Define a per-atom-function max(fmax,fx)
  variable max atom "fx*(fx > f_fmax)+f_fmax*(f_fmax >= fx)"  
# Evaluate max() every time-step using a fix.
  fix evalfunc all ave/atom 1 1 1 v_max 
# Assign the result to the fmax array 
  fix fmax all ave/atom 1 1 1 f_evalfunc 
Dump the fmax array (f_fmax) at any interval just like any other array.  Recall that fixes occur in the order they are defined.  Note that LAMMPS may have recently replaced ">" with "&gt".  