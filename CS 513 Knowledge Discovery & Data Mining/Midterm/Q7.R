# Course       : CS513-A Knowledge Discovery and Data Mining
# First Name   : Devila 
# Last Name    : Bakrania
# Id           : 10457590
# purpose      : MidTerm Q7

#Clean the memory
rm(list = ls())

#Load COVID19 healthcare workers Data File CSV
coviddata <- read.csv("/Users/devilabakrania/Downloads/KDD_Midterm/COVID19_v3.csv",na.strings = "?")

#View COVID19 healthcare workers Data File
View(coviddata)

#Remove Missing Values
covidmissing<-na.omit(coviddata)
View(covidmissing)

#Convert Class Column to Factor
covidmissing$Infected<-factor(covidmissing$Infected) 
        #levels = c(2,4), labels = c("benign","malignment"))
View(covidmissing$Infected)
is.factor(covidmissing$Infected)

#Divide data into Training and Test
idx<-sort(sample(nrow(covidmissing),as.integer(.70*nrow(covidmissing))))
training<-covidmissing[idx,-1]
test<-covidmissing[-idx,-1]
summary(test)
#summary(training)

#Predict Diagnosis class using knn
library(kknn)
library(class)


k5<-kknn(formula =Infected~., training, test,k=5, kernel = "triangular")
fit<-fitted(k5)
table(test$Infected,fit)




