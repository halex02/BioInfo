#! /usr/bin/env bash

#Partie 1 : fichiers Fasta
#Question 2 :
echo "Question 2 : test avec l'exemple de l'énoncé test0.fasta"
node bioseq print-fasta-sequences data/test0.fasta

#Question 3 :
echo "Question 3 : test avec l'exemple de l'énoncé test0.fasta"
node bioseq print-fasta-stats data/test0.fasta

#Question 5 :
echo "Question 5 :"
echo "test pour la phage lambda:"
node bioseq print-fasta-stats data/phage-lambda.fasta
echo "test pour le virus ebola-z :"
node bioseq print-fasta-stats data/ebola-z.fasta
echo "test pour le virus ebola-t :"
node bioseq print-fasta-stats data/ebola-t.fasta

#On constate que les valeurs obtenues sont bien les valeurs indiquées dans l'énoncé pour ces virus.

#Partie 2 : k-mers
#Question 6 :
echo "Question 6 :"
echo "affichage des k-mers pour test1 :"
node bioseq list-kmers 4 data/test1.fasta

#Question 7 :
echo "Question 7 :"
echo "affichages des k-mers communs entre test1 et test2 :"
node bioseq common-kmers 4 data/test1.fasta data/test2.fasta

#Question 8 :
echo "Question 8 :"
echo "ratio des kmers de test1 dans test2 :"
#Il faut faire attention à l'ordre des fichiers pour cette commande,
#car on ne peut pas intervertir les opérandes dans une division.
node bioseq ratio-common-kmers 4 data/test1.fasta data/test2.fasta

#Question 9 :
echo "Question 9 :"
for i in 4 8 12 16 20
do
    echo "test pour k-mers de taille $i :"
    
    echo "comparaison entre ebola-z et phage-lmabda : " && node bioseq ratio-common-kmers $i data/ebola-z.fasta data/phage-lambda.fasta
    echo "comparaison entre ebola-z et ebola-t : " && node bioseq ratio-common-kmers $i data/ebola-z.fasta data/ebola-t.fasta
done

#On constate que ebola-z est plus proche de son 'cousin' que de phage-lambda
#On constate également que plus la taille des kmers est importante, plus l'écart entre les ratio l'est également.

#Question 10 :
echo "Question 10 :"
echo "test sur la séquence test1 (4 itérations) :"
for i in 1..4
do
    node bioseq random-mutations 2 data/test1.fasta
done

