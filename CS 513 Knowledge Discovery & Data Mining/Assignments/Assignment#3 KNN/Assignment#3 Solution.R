# Course       : CS513-A Knowledge Discovery and Data Mining
# First Name   : Devila 
# Last Name    : Bakrania
# Id           : 10457590
# purpose      : HW03_KNN

#Clean the memory
rm(list = ls())

#Load the data
breastcancerwisconsindata <- read.csv("/Users/devilabakrania/Downloads/KDD/breast-cancer-wisconsin.data.csv",na.strings = "?")
View(breastcancerwisconsindata)

#Remove Missing Values
breastcancermissing<-na.omit(breastcancerwisconsindata)
View(breastcancermissing)

#Convert Class Column to Factor
breastcancermissing$Class<-factor(breastcancermissing$Class, levels = c(2,4), labels = c("benign","malignment"))
View(breastcancermissing$Class)
is.factor(breastcancermissing$Class)

#Divide data into Training and Test
idx<-sort(sample(nrow(breastcancermissing),as.integer(.70*nrow(breastcancermissing))))
training<-breastcancermissing[idx,-1]
test<-breastcancermissing[-idx,-1]
summary(test)
summary(training)

#Predict Diagnosis class using knn
library(kknn)
library(class)

k3<-kknn(formula = Class~., training, test, k=3, kernel = "triangular")
fit<-fitted(k3)
table(test$Class,fit)

k5<-kknn(formula = Class~., training, test,k=5, kernel = "triangular")
fit<-fitted(k5)
table(test$Class,fit)

k10<-kknn(formula = Class~., training, test, k=10, kernel = "triangular")
fit<-fitted(k10)
table(test$Class,fit)

