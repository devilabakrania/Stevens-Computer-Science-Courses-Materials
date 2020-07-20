#########################################################
##  Purpose: Create pretty classification tree for attrition data
##  Name : Priya Gupta       
##  CWID : 10457442
#########################################################

##  Step 0: Clear the environment

rm(list=ls())


#########################################################
##  Step 1: Load the relavent packages
##           
##
#########################################################
installed.packages()

#install.packages("rpart")  # CART standard package
?install.packages()

#install.packages("rpart")
#install.packages("rpart.plot")     # Enhanced tree plots
#install.packages("rattle")         # Fancy tree plot
#install.packages("RColorBrewer")   # colors needed for rattle
library(rpart)
library(rpart.plot)  			# Enhanced tree plots
library(rattle)           # Fancy tree plot
library(RColorBrewer)     # colors needed for rattle

#########################################################

##  Step 2:  example
##           
##
#########################################################


filename<-file.choose()
dsn<-  read.csv(filename )

dsn<-dsn[,-c(1:2,4:7,9:12, 23:27)]

#View(dsn) 
#attach(dsn)
#detach(dsn)

set.seed(111)
?ifelse


index<-sort(sample(nrow(dsn),round(.30*nrow(dsn))))
training<-dsn[-index,]
test<-dsn[index,]

?rpart()
#Grow the tree 
dev.off()

CART_class<-rpart( STATUS~.,data=training)
rpart.plot(CART_class,cex=.6)
CART_predict2<-predict(CART_class,test, type="class")

table(Actual=test[,4],CART=CART_predict2)

table(Actual=test[,12],CART=CART_predict2)

table(Actual=test[,7],CART=CART_predict2)

table(Actual=test[,10],CART=CART_predict2)

CART_predict<-predict(CART_class,test) 

CART_wrong<-sum(test[,"STATUS"]!=CART_predict2)
error_rate=CART_wrong/length(test$STATUS)





