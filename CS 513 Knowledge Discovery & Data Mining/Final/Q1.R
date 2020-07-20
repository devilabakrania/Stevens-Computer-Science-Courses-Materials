# Course       : CS513-A Knowledge Discovery and Data Mining
# First Name   : Devila 
# Last Name    : Bakrania
# Id           : 10457590
# purpose      : Q1 Final Exam

#Clear the memory
rm(list=ls())

#Choosing the data
admission_dataSet <- read.csv("/Users/devilabakrania/Downloads/KDD/Admission.csv",na.strings = "?")

#Viewing and summarizing the data
View(admission_dataSet)
summary(admission_dataSet)
table(admission_dataSet$ADMIT)

#kmeans
admission_dataSet<-admission_dataSet[-1]
kmeans_data<- kmeans(admission_dataSet[,c(2,3)],2,nstart = 10)
kmeans_data$cluster
table(kmeans_data$cluster,admission_dataSet[,1])

#hcluster
admission_dist<-dist(admission_dataSet[,c(2,3)])
hclust_results<-hclust(admission_dist)
plot(hclust_results)
hclust_2<-cutree(hclust_results,2)
table(hclust_2,admission_dataSet[,1])

