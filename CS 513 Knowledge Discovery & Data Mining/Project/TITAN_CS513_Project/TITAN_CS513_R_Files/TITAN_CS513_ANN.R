# Course       : CS513-A Knowledge Discovery and Data Mining
# First Name   : Devila 
# Last Name    : Bakrania
# Id           : 10457590
# purpose      : ANN

#remove all objects
rm(list=ls())
install.packages("neuralnet")
library("neuralnet")

#Load Data File CSV
attritiondata <- read.csv("/Users/devilabakrania/Downloads/KDD/attrition_data.csv",na.strings = "?")

#dataSet<-read.csv("wisc_bc_ContinuousVar.csv",na.strings = '?')
View(attritiondata)
table(attritiondata$STATUS)

#To factor the data set
attritiondata<-data.frame(lapply(na.omit(attritiondata),as.numeric))

# To split the data set into test and testing 
idx<-sort(sample(nrow(attritiondata),as.integer(.70*nrow(attritiondata))))
training<-attritiondata[idx,]
test<-attritiondata[-idx,]
?neuralnet()
model<- neuralnet(STATUS~.,training[-1], hidden=5, threshold=0.01)

#Plot the neural network
plot(model)

## test should have only the input colum
ann <-compute(model,test)
ann$net.result 

ann_cat<-ifelse(ann$net.result <1.5,1,2)
length(ann_cat)
length(test$STATUS)
table(ann_cat,test$STATUS)

wrong<- (test$STATUS!=ann_cat)
errorRate<-sum(wrong)/length(wrong)
accuracy<-100-(errorRate*100)
errorRate
accuracy


