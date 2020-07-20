# Course       : CS513-A Knowledge Discovery and Data Mining
# First Name   : Devila 
# Last Name    : Bakrania
# Id           : 10457590
# purpose      : HW_06_RF_C50 6.1

#remove all objects
rm(list = ls())
install.packages('C50', dependencies = T)
library(C50)
#Load Breast Cancer Wisconsin Data File CSV
breastcancerwisconsindata <- read.csv("/Users/devilabakrania/Downloads/KDD/breast-cancer-wisconsin.data.csv",na.strings = "?")

#View Breast Cancer Wisconsin Data File
View(breastcancerwisconsindata)
table(breastcancerwisconsindata$Class)
#To factor the data set
breastcancerwisconsindata$Class <- factor(breastcancerwisconsindata$Class, levels = c(2,4),labels = c("Benign", "Malignant"))
# To split the data set into test and testing 
idx<-sort(sample(nrow(breastcancerwisconsindata),as.integer(.70*nrow(breastcancerwisconsindata))))
training<-breastcancerwisconsindata[idx,]
test<-breastcancerwisconsindata[-idx,]

dev.off()
#Implement C 5.0
model<-C5.0(Class~.,training[,-1])
summary(model)
plot(model)
#Prediction using test 
prediction<-predict(model,test[,-1],type="class") 
#Forming the confusin matrix
conf_matrix<-table(test[,11],prediction)
conf_matrix
str(prediction)
#Showing the error rate 
wrong<-sum(test[,11]!=prediction)
error_rate<-wrong/length(test[,11])
error_rate
