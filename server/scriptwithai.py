from langchain_groq import ChatGroq
from dotenv import load_dotenv
from langchain_community.document_loaders import WebBaseLoader
from langchain_core.prompts import PromptTemplate
import os

load_dotenv()
GROQ_API_KEY=os.getenv("GROQ_API_KEY")

llm = ChatGroq(
    model="llama-3.1-70b-versatile",
    temperature=0,
    max_tokens=None,
    timeout=None,
    max_retries=2,
    api_key=GROQ_API_KEY,
    )

prompt = PromptTemplate.from_template("""

    ### SCRIPT WRITER:
        {script_topic}
    ### INSTRUCTIONS:
    01. Create a clear and engaging script based on the provided topic. Ensure the script is well-structured with an introduction, main content, and a conclusion. Use appropriate language and tone for the intended audience.
    02. Use appropriate dialogue, pacing, and transitions to ensure the script flows smoothly and effectively. Ensure the script is easy to follow and understand.
    03. no preamble needed.
    04. Not put instructions just paragraphs
    ### VALID (NO PREAMBLE)
    """)
def create_script(script_topic):
    chain=prompt | llm
    res=chain.invoke(input=f'script_topic: {script_topic}')
    # script_created=res.content
    print(res.content)
    return res.content

# create_script(script_topic='Tanzania')