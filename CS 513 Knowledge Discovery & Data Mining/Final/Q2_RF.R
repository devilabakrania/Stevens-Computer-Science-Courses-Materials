#CS513- Knowledge Discovery and Data Mining
#Devila Bakrania 
#10457590
#Q2-Random Forest

library(randomForest)
#Clear the memory
rm(list=ls())

filename <- file.choose()
admission <-  read.csv(filename )
View(admission)
dev.off()

## Gre and Gpa are converted to numeric data 
admission$GPA = as.numeric(admission$GPA)
admission$GRE = as.numeric(admission$GRE)
admission$ADMIT<-factor(admission$ADMIT, levels = c(0,1), labels = c("Not Admit","Admit"))

# get tarining and test data
index <- sort(sample(nrow(admission),round(.30*nrow(admission))))
training <- admission[-index,]
test <- admission[index,]

#perform classification using randomForest.
result <- randomForest(ADMIT~. , data = training[,-1,-2], importance = TRUE, ntree = 1000)

#identify important features
importance(result)
varImpPlot(result)

#perform prediction
randomForest_predict <- predict(result , test[,-1])
table(randomForest_predict, test$ADMIT)

#error rate for randomForest.
wrong <- (test$ADMIT != randomForest_predict)
error_rate= sum(wrong)/length(wrong)
error_rate

#accuracy 
accuracy <- (1 - error_rate) * 100
accuracy
