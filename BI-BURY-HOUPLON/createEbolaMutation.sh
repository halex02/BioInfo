#! /usr/bin/env bash

for i in 0 10 100 1000 10000
do
    node createEbolaMutation $i >> ./data/ebola-mutant-$i.fasta
done
