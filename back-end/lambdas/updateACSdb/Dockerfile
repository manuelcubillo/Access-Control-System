FROM amazon/aws-lambda-python:3.8

RUN /var/lang/bin/python3.8 -m pip install --upgrade pip

COPY lambdas/updateACSdb/requirements.txt .
RUN pip install -r requirements.txt

COPY lambdas/updateACSdb/src/ .
COPY lambdas/utils/src/ .
COPY lambdas/core/src/ .


CMD ["handler.handler"]