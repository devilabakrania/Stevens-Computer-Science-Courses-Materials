remove(list = ls())

#install kknn 
#install.packages("kknn")
library(kknn)

#load data
fileName <- file.choose()
termination <- read.csv(fileName)
termination$STATUS <- factor(termination$STATUS, levels = c('A','T'), labels = c("not terminated","terminated"))
View(termination)
nrow(termination)

dev.off()

# max-min normalization function
normalize <-function(x,minx,maxx) {
  z<-((x-minx)/(maxx-minx))
  return(z) 
}

#normalize data for anuual and hourly salary
termination_normalized <- as.data.frame ( 
  cbind( f1=normalize(termination[,2],min(termination[,2]),max(termination[,2]))
         ,f2=normalize(termination[,3],min(termination[,3]),max(termination[,3]))
         ,STATUS = as.character(termination[,20])
         ))

# knn classification for salary
index <- sample(nrow (termination_normalized), as.integer(.60*nrow(termination_normalized)))
training<-termination_normalized[index,]
nrow(training)
test<- termination_normalized[-index,]
nrow(test)


#termination based on salary
predict_k1 <- kknn(formula=STATUS~., training, test[,-3], k=100, kernel ="rectangular")
fit <- fitted(predict_k1)
output_k1 <- table(Actual=test$STATUS, Fitted=fit)
wrong<- ( test$STATUS != fit)
rate_k1<-sum(wrong)/length(wrong)

predict_k2 <- kknn(formula=STATUS~., training, test[,-3], k=200, kernel ="rectangular")
fit <- fitted(predict_k2)
output_k2 <- table(Actual=test$STATUS, Fitted=fit)
wrong<- ( test$STATUS!=fit)
rate_k2<-sum(wrong)/length(wrong)

predict_k5 <- kknn(formula=STATUS~., training, test[,-3], k=500, kernel ="rectangular")
fit <- fitted(predict_k5)
output_k5 <- table(Actual=test$STATUS, Fitted=fit)
wrong<- ( test$STATUS!=fit)
rate_k5<-sum(wrong)/length(wrong)

predict_k10 <- kknn(formula=STATUS~., training, test[,-3], k=1000, kernel ="rectangular")
fit <- fitted(predict_k10)
output_k10 <- table(Actual=test$STATUS, Fitted=fit)
wrong<- ( test$STATUS!=fit)
rate_k10 <-sum(wrong)/length(wrong)

predict_k15 <- kknn(formula=STATUS~., training, test[,-3], k=150, kernel ="rectangular")
fit <- fitted(predict_k15)
output_k15 <- table(Actual=test$STATUS, Fitted=fit)
wrong<- ( test$STATUS!=fit)
rate_k15<-sum(wrong)/length(wrong)



print('*******Annual salary and hourly salary used for classification of termination status for k = 100********')
output_k1
rate_k1
print('*******Annual salary and hourly salary used for classification of termination status for k = 200********')
output_k2
rate_k2
print('*******Annual salary and hourly salary used for classification of termination status for k = 500********')
output_k5
rate_k5
print('*******Annual salary and hourly salary used for classification of termination status for k = 1000********')
output_k10
rate_k10
print('*******Annual salary and hourly salary used for classification of termination status for k = 150********')
output_k15
rate_k15

#normalization for performance and job satisfication
Performance_Satisfiaction_normalized <- as.data.frame ( 
  cbind( f1=normalize(termination[,4],min(termination[,4]),max(termination[,4]))
         ,f2=normalize(termination[,10],min(termination[,10]),max(termination[,10]))
         ,STATUS = as.character(termination[,20])
  ))

index <- sort(sample(nrow (Performance_Satisfiaction_normalized), as.integer(.60*nrow(Performance_Satisfiaction_normalized))))
training<-Performance_Satisfiaction_normalized[index,]
test<- Performance_Satisfiaction_normalized[-index,]

#termination based on performance and job satisfication

predict_k1 <- kknn(formula=STATUS~., training, test[,-3], k=100, kernel ="rectangular")
fit <- fitted(predict_k1)
output_k1 <- table(Actual=test$STATUS, Fitted=fit)
wrong<- ( test$STATUS != fit)
rate_k1<-sum(wrong)/length(wrong)

predict_k2 <- kknn(formula=STATUS~., training, test[,-3], k=200, kernel ="rectangular")
fit <- fitted(predict_k2)
output_k2 <- table(Actual=test$STATUS, Fitted=fit)
wrong<- ( test$STATUS!=fit)
rate_k2<-sum(wrong)/length(wrong)

predict_k5 <- kknn(formula=STATUS~., training, test[,-3], k=500, kernel ="rectangular")
fit <- fitted(predict_k5)
output_k5 <- table(Actual=test$STATUS, Fitted=fit)
wrong<- ( test$STATUS!=fit)
rate_k5<-sum(wrong)/length(wrong)

predict_k10 <- kknn(formula=STATUS~., training, test[,-3], k=1000, kernel ="rectangular")
fit <- fitted(predict_k10)
output_k10 <- table(Actual=test$STATUS, Fitted=fit)
wrong<- ( test$STATUS!=fit)
rate_k10 <-sum(wrong)/length(wrong)

predict_k15 <- kknn(formula=STATUS~., training, test[,-3], k=150, kernel ="rectangular")
fit <- fitted(predict_k15)
output_k15 <- table(Actual=test$STATUS, Fitted=fit)
wrong<- ( test$STATUS!=fit)
rate_k15<-sum(wrong)/length(wrong)


print('*******Performance and job satisfication used for classification of termination status k = 100********')
output_k1
rate_k1

print('*******Performance and job satisfication used for classification of termination status k = 200********')
output_k2
rate_k2

print('*******Performance and job satisfication used for classification of termination status k = 500********')
output_k5
rate_k5

print('*******Performance and job satisfication used for classification of termination status k = 1000********')
output_k10
rate_k10

print('*******Performance and job satisfication used for classification of termination status k = 150********')
output_k15
rate_k15


#all data normalize

termination<-data.frame(lapply(na.omit(termination),as.numeric))


complete_data_normalize <- as.data.frame ( 
  cbind( ANNUAL_RATE=normalize(termination[,2],min(termination[,2]),max(termination[,2]))
         ,HOURLY_RATE=normalize(termination[,3],min(termination[,3]),max(termination[,3]))
         ,JOB_SATISFICATION=normalize(termination[,4],min(termination[,4]),max(termination[,4]))
         ,NUMBER_OF_TEAM_CHANGED=normalize(termination[,5],min(termination[,5]),max(termination[,5]))
         ,HIRE_MONTH = as.character(termination[,6])
         ,REHIRE=normalize(termination[,7],min(termination[,7]),max(termination[,7]))
         ,IS_FIRST_JOB=normalize(termination[,8],min(termination[,8]),max(termination[,8]))
         ,TRAVELLED_REQUIRED=normalize(termination[,9],min(termination[,9]),max(termination[,9]))
         ,PERFORMANCE_RATING=normalize(termination[,10],min(termination[,10]),max(termination[,10]))
         ,DISABLE_EMP=normalize(termination[,11],min(termination[,11]),max(termination[,11]))
         ,DISABLE_VET=normalize(termination[,12],min(termination[,12]),max(termination[,12]))
         ,EDUCATION_LEVEL=normalize(termination[,13],min(termination[,13]),max(termination[,13]))
         ,JOB_GROUP=normalize(termination[,14],min(termination[,14]),max(termination[,14]))
         ,STATUS = as.character(termination[,20])
  ))


index <- sort(sample(nrow (complete_data_normalize), as.integer(.60*nrow(complete_data_normalize))))
training<-complete_data_normalize[index,]
test<- complete_data_normalize[-index,]

#termination based on complete data

predict_k1 <- kknn(formula=STATUS~., training, test[,-20], k=100, kernel ="rectangular")
fit <- fitted(predict_k1)
output_k1 <- table(Actual=test$STATUS, Fitted=fit)
wrong<- ( test$STATUS != fit)
rate_k1<-sum(wrong)/length(wrong)

predict_k2 <- kknn(formula=STATUS~., training, test[,-20], k=200, kernel ="rectangular")
fit <- fitted(predict_k2)
output_k2 <- table(Actual=test$STATUS, Fitted=fit)
wrong<- ( test$STATUS!=fit)
rate_k2<-sum(wrong)/length(wrong)

predict_k5 <- kknn(formula=STATUS~., training, test[,-20], k=500, kernel ="rectangular")
fit <- fitted(predict_k5)
output_k5 <- table(Actual=test$STATUS, Fitted=fit)
wrong<- ( test$STATUS!=fit)
rate_k5<-sum(wrong)/length(wrong)

predict_k10 <- kknn(formula=STATUS~., training, test[,-20], k=1000, kernel ="rectangular")
fit <- fitted(predict_k10)
output_k10 <- table(Actual=test$STATUS, Fitted=fit)
wrong<- ( test$STATUS!=fit)
rate_k10 <-sum(wrong)/length(wrong)

predict_k15 <- kknn(formula=STATUS~., training, test[,-20], k=150, kernel ="rectangular")
fit <- fitted(predict_k15)
output_k15 <- table(Actual=test$STATUS, Fitted=fit)
wrong<- ( test$STATUS!=fit)
rate_k15<-sum(wrong)/length(wrong)


print( print('*******termination based on complete data used for classification of termination status k = 1********'))
output_k1
rate_k1

print( print('*******termination based on complete data used for classification of termination status k = 2********'))
output_k2
rate_k2

print( print('*******termination based on complete data used for classification of termination status k = 5********'))
output_k5
rate_k5

print( print('*******Ptermination based on complete data used for classification of termination status k = 10********'))
output_k10
rate_k10

print( print('*******termination based on complete data used for classification of termination status k = 15********'))
output_k15
rate_k15


#cluster based on team changed
remove(list = ls())
fileName <- file.choose()
termination <- read.csv(fileName)
termination<-data.frame(lapply(na.omit(termination),as.numeric))
termination_kmean <- kmeans(termination[,7], 2 , nstart = 10)
#plot cluster

termination_kmean$cluster
termination_kmean$centers

table(termination_kmean$cluster , termination$STATUS)








