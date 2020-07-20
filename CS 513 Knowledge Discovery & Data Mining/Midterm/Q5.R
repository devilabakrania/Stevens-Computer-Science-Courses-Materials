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
COVID19_No_Missing <- na.omit(coviddata)

# Discretize the Age and MonthAtHospital Columns by using the cut Function to convert continous variable to categorical variable
max_Month <- max(COVID19_No_Missing$MonthAtHospital)
max_Age <- max(COVID19_No_Missing$Age)
#max_v
COVID19_No_Missing$MonthAtHospital <- cut(COVID19_No_Missing$MonthAtHospital, breaks = c(-1,6,max_Month), labels = c("Less than 6 Months","6 or More Months"))
COVID19_No_Missing$Age <- cut(COVID19_No_Missing$Age, breaks = c(-1,35,50,max_Age), labels = c("Less than 35","35 to 50","51 or over"))
#View(COVID19_No_Missing)

#Normalize the Data using min max function
mmnorm <-function(x,minx,maxx) {z<-((x-minx)/(maxx-minx))
return(z) 
}

COVID19_Normalized<-as.data.frame (         
  cbind(   Exposure=mmnorm(COVID19_No_Missing[,3],min(COVID19_No_Missing[,3]),max(COVID19_No_Missing[,3]))
           ,Cases=mmnorm(COVID19_No_Missing[,5],min(COVID19_No_Missing[,5]),max(COVID19_No_Missing[,5]))
           ,ID=as.character(COVID19_No_Missing[,1])
           ,MartialStatus=as.character(COVID19_No_Missing[,4])
           ,Infected=as.character(COVID19_No_Missing[,7])
           ,MonthAtHospital=as.character(COVID19_No_Missing[,6])
           ,Age=as.character(COVID19_No_Missing[,2])
           
           
  )
)


View(COVID19_Normalized)


# Split the data into training and testing data
split <- sort(sample(nrow(COVID19_Normalized), as.integer(.70*nrow(COVID19_Normalized))))

Covid_Training_Data <- COVID19_Normalized[split,]
Covid_Testing_Data <- COVID19_Normalized[-split,]


library(e1071)
library(class)

#Naive Bayes Model
?naiveBayes

Covid_Training_Data$Infected <- as.factor(Covid_Training_Data$Infected)
naivebayes_model<- naiveBayes(Infected ~ ., data = Covid_Training_Data)
naivebayes_predict <- predict(naivebayes_model, Covid_Testing_Data, type = "class")
table(naivebayes_model = naivebayes_predict, Covid_Testing_Data$Infected)

#Measure the accuracy
error <- sum(Covid_Testing_Data[,5] != naivebayes_predict)
error_rate <- error/length(Covid_Testing_Data[,5])
error_rate

