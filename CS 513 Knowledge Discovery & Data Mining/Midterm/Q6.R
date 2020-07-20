# Course     : CS513-A Knowledge Discovery and Data Mining
# First Name : Devila
# Last Name  : Bakrania
# Id         : 10457590
# purpose    : Q6 MidTerm

#Clean the memory
rm(list=ls())

#Load COVID19 healthcare workers Data File CSV
coviddata <- read.csv("/Users/devilabakrania/Downloads/KDD_Midterm/COVID19_v3.csv",na.strings = "?")

# Omit the missing values from the data
COVID19_Missing <- na.omit(coviddata)

# Discretize the Age and MonthAtHospital Columns by using the cut Function to convert continous variable to categorical variable
max_Month <- max(COVID19_Missing$MonthAtHospital)
max_Age <- max(COVID19_Missing$Age)

COVID19_Missing$MonthAtHospital <- cut(COVID19_Missing$MonthAtHospital, breaks = c(-1,6,max_Month), labels = c("Less than 6 Months","6 or More Months"))
COVID19_Missing$Age <- cut(COVID19_Missing$Age, breaks = c(-1,35,50,max_Age), labels = c("Less than 35","35 to 50","51 or over"))
View(COVID19_Missing)

# Split the data into training and testing data
split <- sort(sample(nrow(COVID19_Missing), as.integer(.70*nrow(COVID19_Missing))))

Covid_Training_Data <- COVID19_Missing[split,]
Covid_Test_Data <- COVID19_Missing[-split,]

library(e1071)
library(class)
library(rpart)
library(rpart.plot)  		
library(rattle)           
library(RColorBrewer)    

Covid_Training_Data$Infected <- as.factor(Covid_Training_Data$Infected)

prediction_model<-rpart(Infected~.,Covid_Training_Data[,-1])
rpart.plot(prediction_model,roundint = FALSE)
prediction_data<-predict(prediction_model,Covid_Test_Data[,-1],type="class") 
table(Covid_Test_Data[,7],prediction_data)

fancyRpartPlot(prediction_model)

#Measure the accuracy
error <- sum(Covid_Test_Data[,7] != prediction_data)
error_rate <- error/length(Covid_Test_Data[,7])
error_rate

