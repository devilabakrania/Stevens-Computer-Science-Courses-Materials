# Course     : CS513-A Knowledge Discovery and Data Mining
# First Name : Devila
# Last Name  : Bakrania
# Id         : 10457590
# purpose    : HW_04_NB (Naive Bayes)

#Clean the memory
rm(list=ls())

#Load the data
breastcancerwisconsindata <- read.csv("/Users/devilabakrania/Downloads/KDD/breast-cancer-wisconsin.data.csv",na.strings = "?")
View(breastcancerwisconsindata)

#Remove missing values
breastcancermissing<-na.omit(breastcancerwisconsindata)
View(breastcancermissing)

#Convert Class Column to Factor
breastcancermissing$Class<-factor(breastcancermissing$Class, levels = c(2,4), labels = c("benign","malignant") )

#Classify into Training and Test Data
idx<-sort(sample(nrow(breastcancermissing),as.integer(.70*nrow(breastcancermissing))))
training<-breastcancermissing[idx,-1]
test<-breastcancermissing[-idx,-1]

#Implement Naive Bayes
library(class)
#install.packages('e1071')
library(e1071)
naive_imp<-naiveBayes(formula=Class ~.,data=training)
naive_predict<-predict(naive_imp,test)

#Print
table(NAIVE=naive_predict,class=test$Class)

#Calculate the error and finding the accuracy
error=sum(naive_predict!=test$Class)
error_rate<-error/length(naive_predict)
accuracy<-100-(error_rate*100)
error
error_rate
accuracy
