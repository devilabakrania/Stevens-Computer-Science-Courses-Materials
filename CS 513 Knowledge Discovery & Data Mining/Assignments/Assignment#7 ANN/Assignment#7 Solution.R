# Course       : CS513-A Knowledge Discovery and Data Mining
# First Name   : Devila 
# Last Name    : Bakrania
# Id           : 10457590
# purpose      : HW_07_ANN

#remove all objects
rm(list=ls())
install.packages("neuralnet")
library("neuralnet")

#Load Data File CSV
breastcancerwisconsindata <- read.csv("/Users/devilabakrania/Downloads/KDD/wisc_bc_ContinuousVar.csv",na.strings = "?")

#dataSet<-read.csv("wisc_bc_ContinuousVar.csv",na.strings = '?')
View(breastcancerwisconsindata)
table(breastcancerwisconsindata$diagnosis)

#To factor the data set
breastcancerwisconsindata<-data.frame(lapply(na.omit(breastcancerwisconsindata),as.numeric))

# To split the data set into test and testing 
idx<-sort(sample(nrow(breastcancerwisconsindata),as.integer(.70*nrow(breastcancerwisconsindata))))
training<-breastcancerwisconsindata[idx,]
test<-breastcancerwisconsindata[-idx,]
?neuralnet()
model<- neuralnet(diagnosis~.,training[-1], hidden=5, threshold=0.01)

#Plot the neural network
plot(model)

## test should have only the input colum
ann <-compute(model,test)
ann$net.result 

ann_cat<-ifelse(ann$net.result <1.5,1,2)
length(ann_cat)
length(test$diagnosis)
table(ann_cat,test$diagnosis)

wrong<- (test$diagnosis!=ann_cat)
errorRate<-sum(wrong)/length(wrong)

