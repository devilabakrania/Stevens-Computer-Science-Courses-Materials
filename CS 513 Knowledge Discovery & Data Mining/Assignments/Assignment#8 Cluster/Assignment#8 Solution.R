# Course       : CS513-A Knowledge Discovery and Data Mining
# First Name   : Devila 
# Last Name    : Bakrania
# Id           : 10457590
# purpose      : HW_08_Cluster : 8.1 HClust and 8.2 K-Means

#remove all objects
rm(list=ls())
breastcancerwisconsindata <- read.csv("/Users/devilabakrania/Downloads/KDD/wisc_bc_ContinuousVar.csv",na.strings = "?")
View(breastcancerwisconsindata)
summary(breastcancerwisconsindata)
table(breastcancerwisconsindata$diagnosis)
#To factor the data set
breastcancerwisconsindata<-na.omit(breastcancerwisconsindata)
breastcancerwisconsindata<-breastcancerwisconsindata[-1]
breastcancerwisconsindata_dist<-dist(breastcancerwisconsindata[,-1])
hclust_results<-hclust(breastcancerwisconsindata_dist)
plot(hclust_results)
hclust_2<-cutree(hclust_results,2)
table(hclust_2,breastcancerwisconsindata[,1])


rm(list=ls())
breastcancerwisconsindata <- read.csv("/Users/devilabakrania/Downloads/KDD/wisc_bc_ContinuousVar.csv",na.strings = "?")
View(breastcancerwisconsindata)
summary(breastcancerwisconsindata)
table(breastcancerwisconsindata$diagnosis)
#To factor the data set
breastcancerwisconsindata<-na.omit(breastcancerwisconsindata)
breastcancerwisconsindata<-breastcancerwisconsindata[-1]
kmeans_2<- kmeans(breastcancerwisconsindata[,-1],2,nstart = 10)
kmeans_2$cluster
table(kmeans_2$cluster,breastcancerwisconsindata[,1])

