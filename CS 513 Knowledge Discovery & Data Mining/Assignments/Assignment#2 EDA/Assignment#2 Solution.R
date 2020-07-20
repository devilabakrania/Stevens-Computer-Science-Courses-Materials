# Course       : CS513-A Knowledge Discovery and Data Mining
# First Name   : Devila 
# Last Name    : Bakrania
# Id           : 10457590
# purpose      : HW02_EDA

## remove all objects
rm(list = ls())

#Load Breast Cancer Wisconsin Data File CSV
breastcancerwisconsindata <- read.csv("/Users/devilabakrania/Downloads/KDD/breast-cancer-wisconsin.data.csv",na.strings = "?")

#View Breast Cancer Wisconsin Data File
View(breastcancerwisconsindata)

#I.Summarizing each column (e.g. min, max, mean)
summary(breastcancerwisconsindata)

#II. Identifying missing values
df<-data.frame(breastcancerwisconsindata)
#Number of missing values in set
sum(is.na(df))
#Number of missing values in a row in set
colSums(is.na(df))

#III. Replacing the missing values with the "mean" of the column.

for(i in 1:ncol(df)){
  df[is.na(df[,i]), i] <- mean(df[,i], na.rm = TRUE)
}
View(df)

#x<-mean(breast.cancer.wisconsin.data$F6, na.rm = TRUE)
#breast.cancer.wisconsin.data$F6[is.na(data$F6)]<-x
#View(df)
#IV. Displaying the frequency table of "Class" vs. F6
#ftable <- table(breast.cancer.wisconsin.data$Class,breast.cancer.wisconsin.data$F6)
ftable(df$Class,df$F6)
#print(ftable)

#V. Displaying the scatter plot of F1 to F6, one pair at a time
#pairs(df[2:7],main = "Breast Cancer Wisconsin Data")
pairs(df[2:7],main = "Breast Cancer Wisconsin Data -- 2 Classes",
      pch = 21,bg =c("red","blue")[factor(df$Class)])

#VI. Show histogram box plot for columns F7 to F9
boxplot(df[8:10])

#Delete all objects from R environment
rm(list = ls())

#Reload the “breast-cancer-wisconsin.data.csv” from canvas into R.
breastcancerwisconsindata1 <- read.csv("/Users/devilabakrania/Downloads/KDD/breast-cancer-wisconsin.data.csv",na.strings = "?")
View(breastcancerwisconsindata1)
nrow(breastcancerwisconsindata1)

#Remove any row with a missing value in any of the columns.
breastcancerwisconsinmissingvalue <- na.omit(breastcancerwisconsindata1)
View(breastcancerwisconsinmissingvalue)
nrow(breastcancerwisconsinmissingvalue)

