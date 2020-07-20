# Course       : CS513-A Knowledge Discovery and Data Mining
# First Name   : Devila 
# Last Name    : Bakrania
# Id           : 10457590
# purpose      : Q3 Final Exam

#remove all objects
rm(list = ls())
install.packages('C50', dependencies = T)
library(C50)
#Load Admission_cat Data File CSV
admissioncatdata <- read.csv("/Users/devilabakrania/Downloads/KDD/Admission_cat.csv",na.strings = "?")

#View Breast Cancer Wisconsin Data File
View(admissioncatdata)
table(admissioncatdata$ADMIT)
#To factor the data set
admissioncatdata$ADMIT <- factor(admissioncatdata$ADMIT, levels = c(1,0),labels = c("ADMIT", "NON_ADMIT"))
# To split the data set into test and testing 
idx<-sort(sample(nrow(admissioncatdata),as.integer(.70*nrow(admissioncatdata))))
training<-admissioncatdata[idx,]
test<-admissioncatdata[-idx,]

dev.off()
#Implement C 5.0
model<-C5.0(ADMIT~.,training[,-1])
summary(model)
plot(model)
#Prediction using test 
prediction<-predict(model,test[,-1],type="class") 
#Forming the confusin matrix
conf_matrix<-table(test[,2],prediction)
conf_matrix
str(prediction)
#Showing the error rate 
wrong<-sum(test[,2]!=prediction)
error_rate<-wrong/length(test[,1])
accuracy<-100-(error_rate*100)
error_rate
accuracy
