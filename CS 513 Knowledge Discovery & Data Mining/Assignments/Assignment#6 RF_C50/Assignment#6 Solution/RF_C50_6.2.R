# Course       : CS513-A Knowledge Discovery and Data Mining
# First Name   : Devila 
# Last Name    : Bakrania
# Id           : 10457590
# purpose      : HW_06_RF_C50 6.2

#remove all objects

rm(list=ls())
install.packages('randomForest')
library(randomForest)

#Load Breast Cancer Wisconsin Data File CSV
breastcancerwisconsindata <- read.csv("/Users/devilabakrania/Downloads/KDD/breast-cancer-wisconsin.data.csv",na.strings = "?")
View(breastcancerwisconsindata)
table(breastcancerwisconsindata$Class)

#To factor the data set
breastcancerwisconsindata$Class <- factor(breastcancerwisconsindata$Class, levels = c(2,4),labels = c("Benign", "Malignant"))
breastcancerwisconsindata<-na.omit(breastcancerwisconsindata)

# To split the data set into test and testing 
idx<-sort(sample(nrow(breastcancerwisconsindata),as.integer(.70*nrow(breastcancerwisconsindata))))
training<-breastcancerwisconsindata[idx,]
test<-breastcancerwisconsindata[-idx,]

fit <- randomForest( Class~., data=training, importance=TRUE, ntree=1000)
importance(fit)
varImpPlot(fit)

Prediction <- predict(fit, test)
table(actual=test$Class,Prediction)
wrong<- (test$Class!=Prediction )

errorRate<-sum(wrong)/length(wrong)
errorRate 

