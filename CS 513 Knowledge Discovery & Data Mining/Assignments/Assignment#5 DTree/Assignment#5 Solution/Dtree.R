# Course     : CS513-A Knowledge Discovery and Data Mining
# First Name : Devila
# Last Name  : Bakrania
# Id         : 10457590
# purpose    : HW_05_Dtree

#Clean the memory
rm(list = ls())

library(rpart)
library(rpart.plot)

library(RColorBrewer)
library(rattle)

breastcancerwisconsindata = read.csv("Users/devilabakrania/Downloads/KDD/breast-cancer-wisconsin.data.csv")

breastcancerwisconsindata$Class <- factor(breastcancerwisconsindata$Class,levels = c(2,4), labels = c("Benign","Malignant"))
set.seed(111)

#Create Random Indexes
idx<-sort(sample(nrow(breastcancerwisconsindata),as.integer((.30*nrow(breastcancerwisconsindata)))))

training_data <- breastcancerwisconsindata[-idx,]
testing_data = breastcancerwisconsindata[idx,]

#Growing the tree
dev.off()
cart_class<- rpart(Class~., data = training_data)
summary(cart_class)

#Plotting the graphs
rpart.plot(cart_class)

#scoring
cart_prediction<-predict(cart_class, testing_data, type="class")

#Creating the Frequency Table
table(Actual=testing_data[,11], Cart =cart_prediction)
cart_predictionnew<-predict(cart_class,testing_data)
str(cart_predictionnew)
cart_prediction_category<-ifelse(cart_predictionnew[,1]<=.5,'Malignant','Benign')
table(Actual=testing_data[,11],Cart=cart_prediction_category)

#Percentage accuracy
match<-(testing_data[,11]==cart_prediction)*100
accuracy<-sum(match)/length(match)
accuracy

#Error rate
err<- sum(testing_data[,11]!=cart_prediction)
error_rate<-err/length(testing_data[,11])
error_rate

library(rpart.plot)
prp(cart_class)
fancyRpartPlot(cart_class)


