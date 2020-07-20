# Course       : CS513-A Knowledge Discovery and Data Mining
# First Name   : Devila 
# Last Name    : Bakrania
# Id           : 10457590
# purpose      : MidTerm Q2

## remove all objects
rm(list = ls())

#Load COVID19 healthcare workers Data File CSV
coviddata <- read.csv("/Users/devilabakrania/Downloads/KDD_Midterm/COVID19_v3.csv",na.strings = "?")

#View COVID19 healthcare workers Data File
View(coviddata)

#I.Summarizing each column (e.g. min, max, mean)
summary(coviddata)

#II. Identifying missing values
df<-data.frame(coviddata)
#Number of missing values in set
sum(is.na(df))
#Number of missing values in a row in set
colSums(is.na(df))


#III. Displaying the frequency table of "Infected" vs. "MaritalStatus"
ftable(df$Infected,df$MaritalStatus)
#print(ftable)

#IV. Displaying the scatter plot of "Age", "MaritalStatus", and "MonthAtHospital", one pair at a time

plot(df$Age,df$MaritalStatus, main = "COVID19 healthcare Workers Data: Age vs MaritalStatus",
      xlab = "Age", ylab = "MaritalStatus",pch = 21,bg =c("red","blue"))
      #[factor(df$Infected)])
plot(df$MaritalStatus,df$MonthAtHospital, main = "COVID19 healthcare Workers Data: MaritalStatus vs MonthAtHospital",
      xlab = "MaritalStatus", ylab = "MonthAtHospital", pch = 21,bg =c("red","blue"))
plot(df$Age,df$MonthAtHospital, main = "COVID19 healthcare Workers Data: Age vs MonthAtHospital",
      xlab = "Age", ylab = "MonthAtHospital",pch = 21,bg =c("red","blue"))

#V. Show histogram box plot for columns: "Age", "Maritalstatus" and "MonthAtHospital"
boxplot(df$Age, df$MaritalStatus, df$MonthAtHospital)

#Delete all objects from R environment
rm(list = ls())

#Reload the “COVID19_v3.csv” from canvas into R.
coviddata1 <- read.csv("/Users/devilabakrania/Downloads/KDD_Midterm/COVID19_v3.csv",na.strings = "?")
View(coviddata1)
nrow(coviddata1)

#Remove any row with a missing value in any of the columns.
coviddatamissingvalue <- na.omit(coviddata1)
View(coviddatamissingvalue)
nrow(coviddatamissingvalue)

#VI Replacing the missing values of “Cases” with the “mean” of “Cases”.

df$Cases[is.na(df$Cases)] <- mean(df$Cases, na.rm = TRUE)

View(df)

